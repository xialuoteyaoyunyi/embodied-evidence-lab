export const allowedHosts = ['static.cninfo.com.cn','www.cninfo.com.cn','www.sse.com.cn','www.szse.cn','www.hkexnews.hk','www.sec.gov','www.miit.gov.cn','www.gov.cn','www.faulhaber.com','shadowrobot.com','www.shadowrobot.com','www.ati-ia.com','ati.novanta.com','investors.novanta.com','www.realsenseai.com','www.orbbec.com','www.orbbec.com.cn'];
export function safeSourceUrl(value) {
 try {const u=new URL(value); return u.protocol==='https:' && !u.username && !u.password && (!u.port||u.port==='443') && allowedHosts.includes(u.hostname) ? u.href : null;} catch{return null;}
}
export function validateInput(input) {
 if(!input||typeof input!=='object') throw new Error('请求格式不正确');
 const {company,branch,title,url,date,locator,text}=input;
 if(typeof company!=='string'||!company.trim()||company.length>80) throw new Error('请填写公司名称');
 if(!['drive','hand','force','vision'].includes(branch)) throw new Error('请选择有效产业环节');
 if(typeof title!=='string'||!title.trim()||title.length>200) throw new Error('请填写材料标题');
 if(!safeSourceUrl(url)) throw new Error('仅接受白名单中的官方 HTTPS 来源；该地址不支持');
 if(typeof date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||new Date(date).toISOString().slice(0,10)!==date||date>new Date().toISOString().slice(0,10)) throw new Error('材料日期无效或晚于当前日期');
 if(typeof locator!=='string'||!locator.trim()||locator.length>200) throw new Error('请填写页码或章节定位');
 if(typeof text!=='string'||text.trim().length<20||text.length>16000) throw new Error('材料原文应为20–16000字符');
 if(/(?:sk-[A-Za-z0-9_-]{16,}|PRIVATE KEY|API_KEY\s*=)/.test(text)) throw new Error('材料疑似含密钥，请删除敏感信息');
 const concept=typeof input.concept==='string'?input.concept.trim():'';
 if(concept.length>120)throw new Error('关系名称过长');
 return {company:company.trim(),branch,concept,title:title.trim(),url:safeSourceUrl(url),date,locator:locator.trim(),text:text.trim()};
}
export function validateCandidate(candidate,input) {
 if(!candidate||typeof candidate!=='object'||Array.isArray(candidate)) throw new Error('模型返回的结构无效');
 const {claim,quote,stage,limit,concept}=candidate;
 if(!['E0','E1','E2','E3','E4'].includes(stage)) throw new Error('模型业务阶段无效');
 for(const [k,v] of Object.entries({claim,limit,concept})) if(typeof v!=='string'||!v.trim()||v.length>1600) throw new Error('模型缺少有效字段：'+k);
 if(typeof quote!=='string'||quote.length>600||(quote&&!input.text.includes(quote))||(stage!=='E0'&&!quote.trim())) throw new Error('模型引用无法在输入原文中精确匹配');
 const raw=input.text.replace(/\s/g,'');
 if(stage==='E4'&&(!candidate.revenue||typeof candidate.revenue.amount!=='string'||!['业务分项','产品分项'].includes(candidate.revenue.scope)||!candidate.revenue.amount.trim()||!raw.includes(candidate.revenue.amount.replace(/\s/g,''))||!/收入|revenue/i.test(quote))) throw new Error('收入级结论必须有对应业务金额、分项口径和收入原文');
 if(stage==='E3'&&!/销售|交付|订单|收入|销量|ship|sales|revenue|order/i.test(quote)) throw new Error('销售级结论缺少原文销售或订单信号');
 return {claim,quote,stage,limit,concept:input.concept||concept,revenue:stage==='E4'?candidate.revenue:null,verified:'AI提取 · 待人工确认',company:input.company,branch:input.branch,sourceTitle:input.title,sourceUrl:input.url,date:input.date,locator:input.locator};
}
export function scenario({baseVolume=1000,volumeGrowth=20,adoption=50,units=2,share=10,price=2000,priceChange=0,margin=30}) {
 for(const v of [baseVolume,volumeGrowth,adoption,units,share,price,priceChange,margin]) if(!Number.isFinite(v)) throw new Error('假设必须为有限数字');
 if(baseVolume<0||baseVolume>1e9||volumeGrowth< -100||volumeGrowth>1000||adoption<0||adoption>100||units<0||units>100||share<0||share>100||price<0||price>1e9||priceChange< -100||priceChange>1000||margin<0||margin>100) throw new Error('假设超出合理计算边界');
 const before=baseVolume*adoption/100*units*share/100*price;
 const after=before*(1+volumeGrowth/100)*(1+priceChange/100);
 return {before,after,delta:after-before,grossProfit:after*margin/100};
}
export function updateDecision(oldRecord,newRecord) {
 if(!oldRecord) return '新增关系';
 if(newRecord.date<oldRecord.date) return '历史补充 · 不替换当前判断';
 if(newRecord.date===oldRecord.date&&newRecord.stage===oldRecord.stage&&newRecord.claim===oldRecord.claim) return '重复证据';
 if(newRecord.stage!==oldRecord.stage) return '阶段变化 · 需确认';
 return '同阶段新增证据';
}
