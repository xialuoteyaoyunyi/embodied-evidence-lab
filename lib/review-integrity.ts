import {researchEnv} from './runtime-env';
import verifiedCase from './verified-case.json';
const hex=(bytes:ArrayBuffer)=>Array.from(new Uint8Array(bytes)).map(x=>x.toString(16).padStart(2,'0')).join('');
export async function textHash(text:string){return hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)));}
function signedFields(r:any){return JSON.stringify({candidate:r.candidate,input:r.input,model:r.model,inputSha256:r.inputSha256,createdAt:r.createdAt,requestId:r.requestId,promptVersion:r.promptVersion,usage:r.usage||null,sourceVerification:r.sourceVerification||null});}
export async function reviewSignature(record:any){const secret=researchEnv('REVIEW_SIGNING_KEY');if(!secret)throw new Error('研究签名密钥未配置');const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return hex(await crypto.subtle.sign('HMAC',k,new TextEncoder().encode(signedFields(record))));}
export async function validReview(record:any){if(typeof record?.reviewToken!=='string'||record.reviewToken.length!==64)return false;const expected=await reviewSignature(record);let diff=0;for(let i=0;i<64;i++)diff|=expected.charCodeAt(i)^record.reviewToken.charCodeAt(i);return diff===0;}
export function matchesVerifiedCase(input:any){return ['company','branch','concept','title','url','date','locator','text'].every(k=>input?.[k]===(verifiedCase as any)[k]);}
let verified:{at:number,value:any}|null=null;
export async function verifyCaseDocument(){
 if(verified&&Date.now()-verified.at<300000)return {...verified.value,cached:true};
 const r=await fetch(verifiedCase.url,{signal:AbortSignal.timeout(20000),redirect:'manual'});if(!r.ok)throw new Error('官方PDF暂不可访问；不提升来源验证状态');
 if(Number(r.headers.get('content-length')||0)>12000000)throw new Error('官方材料超过大小限制');
 const bytes=await r.arrayBuffer();if(bytes.byteLength>12000000)throw new Error('官方材料超过大小限制');
 const sha256=hex(await crypto.subtle.digest('SHA-256',bytes));if(sha256!==verifiedCase.documentSha256)throw new Error('官方PDF内容哈希变化，需要重新核验页码与原文');
 const value={status:'official-document-hash-matched',documentSha256:sha256,checkedAt:new Date().toISOString(),locator:verifiedCase.locator,method:verifiedCase.auditMethod};verified={at:Date.now(),value};return value;
}
