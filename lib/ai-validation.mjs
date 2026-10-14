export function validateAnswer(parsed,knownIds){
 const known=new Set(knownIds);
 if(!parsed||typeof parsed.summary!=='string'||parsed.summary.length>2500||typeof parsed.boundary!=='string'||!Array.isArray(parsed.findings)||parsed.findings.length>6)throw new Error('回答结构无效');
 for(const f of parsed.findings){
  if(!['事实','推断','待验证'].includes(f?.kind)||typeof f.text!=='string'||f.text.length>2500||!Array.isArray(f.evidenceIds)||f.evidenceIds.some(id=>!known.has(id))||(f.kind!=='待验证'&&!f.evidenceIds.length))throw new Error('回答的证据引用无效');
 }
 return parsed;
}
export function providerError(message){
 if(message==='AI_NOT_CONFIGURED')return {status:503,error:'Kimi尚未配置，已有证据和比较仍可浏览'};
 if(message==='UPSTREAM_401')return {status:502,error:'Kimi鉴权失败，请检查服务端密钥'};
 if(message==='UPSTREAM_429')return {status:503,error:'Kimi限流或额度不足，请稍后重试'};
 if(message.startsWith('UPSTREAM_'))return {status:502,error:'Kimi接口暂不可用；请稍后重试'};
 if(message==='AI_TRUNCATED'||message==='AI_BAD_FORMAT')return {status:422,error:'模型输出不完整或格式无效；未写入研究库'};
 return {status:504,error:'AI请求超时或失败，原有研究记录已保留'};
}
