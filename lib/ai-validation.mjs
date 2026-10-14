export function validateAnswer(parsed,knownIds){
 const known=new Set(knownIds);
 if(!parsed||typeof parsed.summary!=='string'||parsed.summary.length>2500||typeof parsed.boundary!=='string'||!Array.isArray(parsed.findings)||parsed.findings.length>6)throw new Error('回答结构无效');
 for(const f of parsed.findings){
  if(!['事实','推断','待验证'].includes(f?.kind)||typeof f.text!=='string'||f.text.length>2500||!Array.isArray(f.evidenceIds)||f.evidenceIds.some(id=>!known.has(id))||(f.kind!=='待验证'&&!f.evidenceIds.length))throw new Error('回答的证据引用无效');
 }
 return parsed;
}
export function validateAnswerNumbers(parsed,context){
 for(const finding of parsed.findings){
  if(finding.kind!=='事实')continue;
  const referred=context.filter(e=>finding.evidenceIds.includes(e.id));
  const raw=referred.map(e=>[e.claim,e.quote,e.fullText,e.limit,e.period,e.date,e.locator].filter(Boolean).join(' ')).join(' ');
  const supported=new Set();
  for(const match of raw.matchAll(/\d[\d,]*(?:\.\d+)?/g)){
   const number=Number(match[0].replaceAll(',',''));supported.add(String(number));
   if(number>=10000){supported.add(String(Number((number/10000).toFixed(2))));supported.add(String(Number((number/1e8).toFixed(2))));}
  }
  if(raw.includes('千'))supported.add('1000');
  const words={'一':'1','二':'2','三':'3','四':'4','五':'5','六':'6','七':'7','八':'8','九':'9','十':'10'};for(const [word,value] of Object.entries(words))if(new RegExp(word+'(?:轴|维|个)').test(raw))supported.add(value);
  for(const lower of raw.matchAll(/(?:超过|超|逾|多于)\s*(\d[\d,]*(?:\.\d+)?)/g)){const number=lower[1].replaceAll(',','');if(new RegExp('(?:^|\\D)'+number+'(?:\\D|$)').test(finding.text)&&!new RegExp('(?:超过|超|逾|多于|至少|不低于|>)\\s*'+number+'|'+number+'\\s*以上').test(finding.text))throw new Error('回答把下界数量改写成了精确数量');}
  for(const match of raw.matchAll(/(?:^|\D)(\d{2})年/g))supported.add(String(2000+Number(match[1])));
  for(const match of finding.text.matchAll(/\d[\d,]*(?:\.\d+)?/g))if(!supported.has(String(Number(match[0].replaceAll(',','')))))throw new Error('回答出现引用材料中未支持的数字');
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
