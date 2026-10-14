import {researchEnv} from '@/lib/runtime-env';
import {queryIfind,IFIND_AREAS} from '@/lib/ifind.mjs';
const cache=new Map<string,{at:number;value:any}>(),pending=new Map<string,Promise<any>>(),buckets=new Map<string,number>();
const reply=(value:unknown,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const u=new URL(request.url),origin=request.headers.get('origin');if(origin&&origin!==u.origin)return reply({error:'请求来源不匹配'},403);
 const access=researchEnv('RESEARCH_ACCESS_CODE');if(access&&request.headers.get('x-research-access')!==access)return reply({error:'请先在连接设置中输入研究访问码'},403);
 if(!access&&!['localhost','127.0.0.1','[::1]'].includes(u.hostname))return reply({error:'公共数据服务尚未配置访问码'},503);
 const key=researchEnv('IFIND_AUTHORIZATION');if(!key)return reply({error:'iFinD密钥尚未配置'},503);
 let body;try{const raw=await request.text();if(raw.length>2000)return reply({error:'请求过大'},413);body=JSON.parse(raw);}catch{return reply({error:'请求必须是JSON'},400);}
 if(!IFIND_AREAS.some(a=>a.id===body?.area)||!['柯力传感','兆威机电','奥比中光'].includes(body?.company))return reply({error:'研究类别或公司不支持'},400);
 const now=Date.now(),identity=request.headers.get('cf-connecting-ip')||'local';if(now-(buckets.get(identity)||0)<5000)return reply({error:'请等待5秒后再查询'},429);buckets.set(identity,now);if(buckets.size>1000)buckets.clear();
 const id=body.area+'|'+body.company,existing=cache.get(id);if(existing&&now-existing.at<300000)return reply({...existing.value,cached:true});
 try{if(!pending.has(id))pending.set(id,queryIfind(key,body.area,body.company).then(value=>{cache.set(id,{at:Date.now(),value});return value;}).finally(()=>pending.delete(id)));return reply({...await pending.get(id),cached:false});}catch(e){return reply({error:(e as Error).message},(e as {status?:number}).status||502);}
}
