import {apiReply,accessError,boundedJSON} from '@/lib/api-guard';
import {researchBinding} from '@/lib/runtime-env';
import {validReview,textHash} from '@/lib/review-integrity';
import {companies,evidence} from '@/lib/research-data';
import {validateInput,validateCandidate,updateDecision} from '@/lib/research-core.mjs';
const getDB=()=>researchBinding<D1Database>('DB');
export async function GET(request:Request){const denied=accessError(request);if(denied)return denied;const db=getDB();if(!db)return apiReply({error:'云端记录数据库未连接；本机版本仍可使用'},503);
 const scope=new URL(request.url).searchParams.get('scope')||'research';if(!['research','validation'].includes(scope))return apiReply({error:'记录空间不支持'},400);
 try{const r=await db.prepare('SELECT id,record_json,confirmed_at,version FROM research_records WHERE relation_key LIKE ? ORDER BY version DESC LIMIT 100').bind(scope+'|%').all<{id:string,record_json:string,confirmed_at:string,version:number}>();return apiReply({records:r.results.map(row=>({...JSON.parse(row.record_json),storageId:row.id,confirmedAt:row.confirmed_at,serverVersion:row.version})),storage:'cloud-d1'});}catch{return apiReply({error:'读取云端记录失败；本机版本保留'},503);}}
export async function POST(request:Request){const denied=accessError(request);if(denied)return denied;const db=getDB();if(!db)return apiReply({error:'云端记录数据库未连接；请保留本机记录'},503);
 let validated=false;try{const body=await boundedJSON(request);const r=body?.record;if(body?.confirmed!==true)return apiReply({error:'保存前需明确确认原文与口径'},400);
 const input=validateInput(r?.input);validateCandidate(r?.candidate,input);
 if(await textHash(input.text)!==r.inputSha256||!await validReview(r))return apiReply({error:'研究结果签名或原文哈希不匹配，未写入云端'},422);
 validated=true;const companyId=companies.find(c=>c.name===r.candidate.company)?.id;if(!companyId)return apiReply({error:'公司不属于当前研究范围'},400);
 const scope=body.scope||'research';if(!['research','validation'].includes(scope))return apiReply({error:'记录空间不支持'},400);
 const relation=scope+'|'+[r.candidate.company,r.candidate.branch,r.candidate.concept].join('|'),id=crypto.randomUUID(),at=new Date().toISOString();
 const previousRow=await db.prepare('SELECT record_json FROM research_records WHERE relation_key=? ORDER BY document_date DESC,version DESC LIMIT 1').bind(relation).first<{record_json:string}>();const previous=previousRow?JSON.parse(previousRow.record_json).candidate:evidence.find(e=>e.company===companyId&&e.branch===r.candidate.branch&&e.concept===r.candidate.concept);const audited={...r,previousStage:previous?.stage,changeKind:updateDecision(previous,r.candidate),recordScope:scope,confirmedBy:scope==='validation'?'自动化验收确认（非候选人亲自审阅）':'研究访问码授权确认（未验证人员身份）'};
 await db.prepare('INSERT OR IGNORE INTO research_records(id,relation_key,input_hash,document_date,record_json,confirmed_at,version) SELECT ?,?,?,?,?,?,COALESCE(MAX(version),0)+1 FROM research_records').bind(id,relation,r.inputSha256,input.date,JSON.stringify(audited),at).run();
 const row=await db.prepare('SELECT id,record_json,confirmed_at,version FROM research_records WHERE relation_key=? AND input_hash=?').bind(relation,r.inputSha256).first<{id:string,record_json:string,confirmed_at:string,version:number}>();
 if(!row)throw new Error('Record not persisted');return apiReply({record:{...JSON.parse(row.record_json),storageId:row.id,confirmedAt:row.confirmed_at,serverVersion:row.version},duplicate:row.id!==id,storage:'cloud-d1'});
 }catch(e){return apiReply({error:validated?'云端保存暂不可用；待确认结果保留，请稍后重试':(e as Error).message||'保存失败'},validated?503:400);}}
