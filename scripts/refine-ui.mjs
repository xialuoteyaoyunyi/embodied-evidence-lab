import fs from 'node:fs';
const p='app/page.tsx';let s=fs.readFileSync(p,'utf8');
s=s.replace('<label className="wide">材料标题','<label className="wide">具体关系名称（用于版本对比）<input aria-label="具体关系名称" value={input.concept} onChange={e=>setInput({...input,concept:e.target.value})}/><small>更新同一关系请使用相同名称，例如“机器人力学传感器”。</small></label><label className="wide">材料标题');
s=s.replace('<p>{e.claim}</p><small>','<p>{e.claim}</p><div className="credibility">{e.stage===\'E0\'?\'支持度：证据不足\':e.sourceId===\'LOCAL\'?\'来源：用户录入 · 未独立抓取核验\':source(e.sourceId)?.kind===\'法定披露\'?\'支持度：较强 · 法定披露\':\'支持度：有限 · 官方产品陈述\'}</div><small>');
fs.writeFileSync(p,s);
const dp='lib/research-data.ts';let d=fs.readFileSync(dp,'utf8');d=d.replace('PDF 第11页：外延并购与战略投资','PDF 第12页：（二）战略投资');fs.writeFileSync(dp,d);
const css='app/globals.css';let c=fs.readFileSync(css,'utf8');c+='\n.credibility{font-size:9px;color:#82918a;margin:7px 0}.relation-card p{font-size:11px}.chain-node p{font-size:11px}.finance-card p{font-size:10px}.company-name small{font-size:9px}.badge{font-size:9px}.form-grid label{font-size:11px}.form-grid input,.form-grid select,.form-grid textarea{font-size:12px}\n';fs.writeFileSync(css,c);
