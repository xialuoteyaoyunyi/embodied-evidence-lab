import {researchEnv} from './runtime-env';
export const apiReply=(value:unknown,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
export function accessError(request:Request):Response|null{
 const u=new URL(request.url),origin=request.headers.get('origin');
 if(origin&&origin!==u.origin)return apiReply({error:'请求来源不匹配'},403);
 const code=researchEnv('RESEARCH_ACCESS_CODE');
 if(code&&request.headers.get('x-research-access')!==code)return apiReply({error:'请先在连接设置中填写研究访问码'},403);
 if(!code&&!['localhost','127.0.0.1','[::1]'].includes(u.hostname))return apiReply({error:'公共研究服务未配置访问码'},503);
 return null;
}
export async function boundedJSON(request:Request,maxBytes=60000):Promise<any>{
 const reader=request.body?.getReader();if(!reader)throw new Error('请求为空');let bytes=0,raw='';const decoder=new TextDecoder();
 while(true){const r=await reader.read();if(r.done)break;bytes+=r.value.length;if(bytes>maxBytes){await reader.cancel();throw new Error('输入超过允许大小');}raw+=decoder.decode(r.value,{stream:true});}raw+=decoder.decode();
 try{return JSON.parse(raw);}catch{throw new Error('请求必须是JSON');}
}
