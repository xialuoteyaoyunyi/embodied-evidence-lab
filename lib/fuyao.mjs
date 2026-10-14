export const FUYAO_CODES=['003021.SZ','603662.SH','688322.SH'];
export const FUYAO_BASE='https://fuyao.aicubes.cn';
export class FuyaoError extends Error {constructor(message,status=502){super(message);this.status=status;}}
export function parseFuyao(body,requested){
 if(body?.code!==0){const code=body?.code;throw new FuyaoError(code===2001?'扶摇密钥无效或已过期':code===2003?'扶摇未开通该数据权限':code===4001?'扶摇请求限流，请稍后重试':'扶摇接口返回异常',code===4001?429:502);}
 if(!body.data||!Array.isArray(body.data.item)||body.data.item.length>100)throw new FuyaoError('扶摇响应结构异常');
 const items=body.data.item;
 if(items.some(x=>!x||!requested.includes(x.thscode)))throw new FuyaoError('扶摇返回了非请求公司');
 return {requestId:typeof body.request_id==='string'?body.request_id:null,sourceTimestamp:typeof body.data.timestamp==='number'&&Number.isFinite(body.data.timestamp)&&Math.abs(body.data.timestamp)<8640000000000000?new Date(body.data.timestamp).toISOString():null,items,missingCodes:requested.filter(c=>!items.some(i=>i.thscode===c))};
}
export async function fuyaoRequest(key,path,params,codes,fetcher=fetch){
 if(!key)throw new FuyaoError('扶摇尚未配置密钥',503);
 const url=new URL(path,FUYAO_BASE);url.search=new URLSearchParams(params).toString();
 let response;try{response=await fetcher(url.toString(),{headers:{'X-api-key':key},signal:AbortSignal.timeout(15000),redirect:'manual'});}catch{throw new FuyaoError('扶摇连接失败或超时，保留现有研究证据');}
 if(!response.ok)throw new FuyaoError(response.status===429?'扶摇请求限流，请稍后重试':'扶摇接口暂不可用',response.status===429?429:502);
 let body;try{body=await response.json();}catch{throw new FuyaoError('扶摇返回了非JSON数据');}
 return {provider:'fuyao',endpoint:url.toString(),retrievedAt:new Date().toISOString(),...parseFuyao(body,codes)};
}
export async function fetchFuyaoResearch(key,fetcher=fetch){
 const tasks=[['prices','/api/a-share/prices/snapshot',{thscodes:FUYAO_CODES.join(',')},FUYAO_CODES],['valuations','/api/a-share/valuations/snapshot',{thscodes:FUYAO_CODES.join(',')},FUYAO_CODES],...FUYAO_CODES.map(c=>['financials:'+c,'/api/a-share/financials/income-statements',{thscode:c,period:'quarterly',limit:'2'},[c]])];
 const results=[];
 // Five bounded queries; keep upstream concurrency low and allow partial capability rights.
 for(const [kind,path,params,codes] of tasks){try{results.push({kind,status:'ok',...await fuyaoRequest(key,path,params,codes,fetcher)});}catch(e){results.push({kind,status:'error',error:e.message,httpStatus:e.status||502});}}
 return {provider:'fuyao',retrievedAt:new Date().toISOString(),scope:'group',results};
}
