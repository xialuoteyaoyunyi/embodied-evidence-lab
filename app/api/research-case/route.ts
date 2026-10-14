import data from '@/lib/verified-case.json';
import {apiReply,accessError} from '@/lib/api-guard';
import {verifyCaseDocument} from '@/lib/review-integrity';
import {ifindRPC,unwrapIfind} from '@/lib/ifind.mjs';
import {researchEnv} from '@/lib/runtime-env';
export async function GET(){return apiReply({case:data,notice:'预先核对的官方公告案例；联网验证PDF哈希后，再进入AI与用户确认流程。'});}
let cached:{at:number,value:any}|null=null;
export async function POST(request:Request){const denied=accessError(request);if(denied)return denied;
 try{if(cached&&Date.now()-cached.at<300000)return apiReply({...cached.value,cached:true});
 const sourceVerification=await verifyCaseDocument();let lead:any;
 try{const params={query:'柯力传感 2026年半年度报告 机器人力学传感器销量与订单',time_start:'2026-08-01',time_end:'2026-09-01',size:3};const r=await ifindRPC(researchEnv('IFIND_AUTHORIZATION'),'news','tools/call',{name:'search_notice',arguments:params});const p=unwrapIfind(r.rpc);lead={status:'returned',endpoint:r.endpoint,rpcId:r.rpcId,retrievedAt:r.retrievedAt,query:params,text:p.text,notice:'检索结果仅作发现线索；AI输入来自已核对的官方PDF片段。'};}catch(e){lead={status:'unavailable',error:(e as Error).message,notice:'检索故障；本次仍独立校验了官方PDF，未伪装为iFinD成功。'};}
 const value={case:data,sourceVerification,lead,checkedAt:new Date().toISOString()};cached={at:Date.now(),value};return apiReply(value);
 }catch(e){return apiReply({error:(e as Error).message},502);}}
