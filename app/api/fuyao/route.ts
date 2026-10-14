import {researchEnv} from '@/lib/runtime-env';
import {fetchFuyaoResearch} from '@/lib/fuyao.mjs';
let cached:{at:number;value:any}|null=null;
let pending:Promise<any>|null=null;
const buckets=new Map<string,number>();
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:Request){
 const u=new URL(request.url),origin=request.headers.get('origin');
 if(origin&&origin!==u.origin)return reply({error:'请求来源不匹配'},403);
 const access=researchEnv('RESEARCH_ACCESS_CODE');
 if(access&&request.headers.get('x-research-access')!==access)return reply({error:'请先在连接设置中输入研究访问码'},403);
 if(!access&&!['localhost','127.0.0.1','[::1]'].includes(u.hostname))return reply({error:'公共数据服务尚未配置访问码'},503);
 const key=researchEnv('FUYAO_API_KEY');if(!key)return reply({error:'扶摇密钥尚未配置'},503);
 const identity=request.headers.get('cf-connecting-ip')||'local',now=Date.now();
 if(now-(buckets.get(identity)||0)<10000)return reply({error:'请等待10秒后再查询'},429);
 buckets.set(identity,now);if(buckets.size>1000)buckets.clear();
 if(cached&&now-cached.at<300000)return reply({...cached.value,cached:true});
 if(!pending)pending=fetchFuyaoResearch(key).then(value=>{if(value.results.some((r:any)=>r.status==='ok'))cached={at:Date.now(),value};return value;}).finally(()=>{pending=null;});
 const value=await pending;return reply({...value,cached:false},value.results.some((r:any)=>r.status==='ok')?200:502);
}
