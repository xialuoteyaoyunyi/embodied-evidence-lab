// Official website uses this HTTPS proxy for MCP tools/list and tools/call.
export const IFIND_BASE='https://mcp.51ifind.com/ds-mcp-servers';
export const IFIND_SERVERS={stock:'hexin-ifind-ds-stock-mcp',news:'hexin-ifind-ds-news-mcp',edb:'hexin-ifind-ds-edb-mcp',global_stock:'hexin-ifind-ds-global-stock-mcp',future:'hexin-ifind-ds-futures-mcp',index:'hexin-ifind-ds-index-mcp'};
export const IFIND_AREAS=[
 {id:'chain',title:'产业链 / 行业指标',coverage:'部分支持',limit:'当前无专门产业链图谱接口。行业指标只提供需求线索，不能证明上下游供货关系。'},
 {id:'notice',title:'公告',coverage:'支持检索',limit:'返回公告相关片段，可能摘要化或截断；须回到原始公告核对。'},
 {id:'reports',title:'研报',coverage:'未开放专门工具',limit:'当前账号工具清单无独立研报检索；新闻检索不替代券商研报。'},
 {id:'business',title:'公司业务',coverage:'支持摘要',limit:'主营业务摘要不能证明具体机器人客户、订单或产品收入。'},
 {id:'commodity',title:'商品',coverage:'支持期货',limit:'沪铜期货可作成本环境线索，不等于采购现货价或公司实际成本。'},
 {id:'macro',title:'宏观',coverage:'支持指标',limit:'制造业PMI代表宏观环境，不能直接推算机器人订单。'},
 {id:'crossmarket',title:'跨市场',coverage:'支持港美股',limit:'Novanta集团财务不等于ATI六维力业务；需核对币种、报告期与合并范围。'}
];
export class IfindError extends Error{constructor(message,status=502){super(message);this.status=status;}}
export function unwrapIfind(value){
 if(value?.error||value?.result?.isError)throw new IfindError('iFinD工具执行失败，请核对权限或查询要求');
 const content=value?.result?.content;
 if(!Array.isArray(content))throw new IfindError('iFinD MCP响应结构异常');
 const text=content.filter(x=>x?.type==='text'&&typeof x.text==='string').map(x=>x.text).join('\n');
 if(!text.trim())throw new IfindError('iFinD未返回文本数据');
 let payload;try{payload=JSON.parse(text);}catch{return {text,payload:null};}
 if(payload&&typeof payload==='object'&&'code' in payload&&payload.code!==1)throw new IfindError('iFinD数据查询失败或当前权益不足');
 if(payload?.data&&typeof payload.data==='object'&&'code' in payload.data&&payload.data.code!==1)throw new IfindError('iFinD子查询失败');
 const data=payload?.data;
 const normalized=typeof data==='string'?data:typeof data?.answer==='string'?data.answer:typeof data?.data==='string'?data.data:JSON.stringify(data??payload,null,2);
 return {text:normalized,payload};
}
export function queryPlan(area,company='柯力传感',today=new Date(Date.now()+8*3600000).toISOString().slice(0,10)){
 if(!['柯力传感','兆威机电','奥比中光'].includes(company))throw new IfindError('不支持该研究公司',400);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(today))throw new IfindError('查询日期无效',400);
 const start=new Date(Date.parse(today+'T00:00:00Z')-120*86400000).toISOString().slice(0,10);
 const recent=new Date(Date.parse(today+'T00:00:00Z')-14*86400000).toISOString().slice(0,10);
 const p={
 chain:['edb','search_edb',{query:'中国工业机器人产量 当月值 同比增长 国家统计局'}],
 notice:['news','search_notice',{query:company+' 最新定期报告 机器人精细操作 灵巧手 六维力传感器 3D视觉业务进展',time_start:start,time_end:today,size:3}],
 business:['stock','get_stock_summary',{query:company+' 主营业务与行业分类 最新定期报告报告期'}],
 commodity:['future','future_quotes',{query:'沪铜主力连续 '+recent+'至'+today+' 收盘价 元每吨'}],
 macro:['edb','get_edb_data',{query:'中国制造业采购经理指数PMI '+start+'至'+today+' 月度值 原始数据来源'}],
 crossmarket:['global_stock','global_stock_financial',{query:'Novanta Inc 美股NOVT 2025财年合并营业收入与净利润 原始币种 明确报告期'}]
 }[area];
 if(area==='reports')return null;
 if(!p)throw new IfindError('不支持该数据类别',400);
 return {server:p[0],tool:p[1],args:p[2]};
}
export async function ifindRPC(key,server,method,params,fetcher=fetch){
 if(!key||/请替换|your ifind-mcp key/i.test(key))throw new IfindError('iFinD密钥尚未配置',503);
 if(!Object.hasOwn(IFIND_SERVERS,server)||!['tools/list','tools/call'].includes(method))throw new IfindError('不支持的MCP请求',400);
 const endpoint=IFIND_BASE+'/'+IFIND_SERVERS[server],id=crypto.randomUUID();
 let r;try{r=await fetcher(endpoint,{method:'POST',headers:{Authorization:key,'Content-Type':'application/json',Accept:'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',id,method,params}),signal:AbortSignal.timeout(30000),redirect:'manual'});}catch{throw new IfindError('iFinD连接失败或超时，已有证据仍可浏览');}
 if(!r.ok)throw new IfindError(r.status===401?'iFinD密钥失效':r.status===403?'iFinD当前工具权限不足':r.status===429?'iFinD限流或额度不足':'iFinD接口暂不可用',r.status===429?429:502);
 const raw=await r.text();if(raw.length>1000000)throw new IfindError('iFinD结果超过1MB，请缩小查询范围');
 let rpc;try{rpc=JSON.parse(raw);}catch{throw new IfindError('iFinD返回非JSON响应');}
 if(rpc?.error||rpc?.result?.isError)throw new IfindError('iFinD MCP调用失败');
 return {rpc,endpoint,rpcId:id,retrievedAt:new Date().toISOString()};
}
export function ifindWarnings(area,text,payload){
 const warnings=[IFIND_AREAS.find(x=>x.id===area)?.limit||'接口结果尚需核验'];
 if(area==='notice')warnings.push('检索命中不等于逐字原文；未定位原公告地址和页码前，不自动更新公司证据等级。');
 if(area==='crossmarket')warnings.push('接口使用“原始币种/元”或MRQ标签时，不自动改写成USD或全年金额，不进行估值排名。');
 if(area==='commodity'){
  const dates=[...text.matchAll(/\b(20\d{2})-?(\d{2})-?(\d{2})\b/g)].map(m=>m[1]+'-'+m[2]+'-'+m[3]);
  if(dates.some(d=>[0,6].includes(new Date(d+'T00:00:00Z').getUTCDay())))warnings.push('结果包含周末日期：核对是否为前值填充、日期映射或交易日口径。');
 }
 if(Array.isArray(payload?.data?.datas)&&payload.data.datas.some(x=>x.success===false))warnings.push('至少一个子查询失败，返回的其余部分不得视作完整覆盖。');
 return warnings;
}
export async function queryIfind(key,area,company,fetcher=fetch){
 const plan=queryPlan(area,company);if(!plan)return {area,status:'unsupported',warning:IFIND_AREAS.find(x=>x.id===area).limit};
 const listed=await ifindRPC(key,plan.server,'tools/list',{},fetcher);
 if(!Array.isArray(listed.rpc?.result?.tools)||!listed.rpc.result.tools.some(t=>t.name===plan.tool))throw new IfindError('当前iFinD工具清单未开放 '+plan.tool);
 const r=await ifindRPC(key,plan.server,'tools/call',{name:plan.tool,arguments:plan.args},fetcher);
 const parsed=unwrapIfind(r.rpc);const contentSha256=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(parsed.text)))).map(x=>x.toString(16).padStart(2,'0')).join('');
 return {area,status:'returned-pending-verification',provider:'ifind',...plan,endpoint:r.endpoint,rpcId:r.rpcId,retrievedAt:r.retrievedAt,text:parsed.text,payload:parsed.payload,warnings:ifindWarnings(area,parsed.text,parsed.payload),contentSha256};
}
