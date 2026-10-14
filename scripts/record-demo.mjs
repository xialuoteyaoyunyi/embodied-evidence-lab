import {createRequire} from 'node:module';import fs from 'node:fs/promises';
const require=createRequire(import.meta.url);let pw;try{pw=require('playwright');}catch{pw=require('C:/Users/xialu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');}
await fs.mkdir('outputs/video',{recursive:true});const browser=await pw.chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:'outputs/video',size:{width:1440,height:1000}}});const page=await context.newPage();
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function caption(text){await page.evaluate(text=>{let c=document.querySelector('#demo-caption');if(!c){c=document.createElement('div');c.id='demo-caption';Object.assign(c.style,{position:'fixed',bottom:'18px',left:'260px',right:'28px',zIndex:'9999',background:'rgba(17,46,55,.96)',color:'#f4e0b8',border:'1px solid #73918a',borderRadius:'8px',padding:'15px 20px',fontFamily:'Microsoft YaHei, sans-serif',fontSize:'18px',textAlign:'center',boxShadow:'0 5px 20px #0002',pointerEvents:'none'});document.body.append(c);}c.textContent=text;},text);}
await page.goto('http://127.0.0.1:5173/');await page.getByRole('heading',{name:'产业链图谱',exact:true}).waitFor();
await caption('具身证据台：研究机器人精细操作的执行与感知产业链');await pause(8000);
await page.locator('.chain-map').scrollIntoViewIfNeeded();await caption('按功能分层：微型执行、力觉触觉和3D视觉，并行汇入灵巧手与下游应用');await pause(8000);
await page.getByRole('button',{name:/奥比中光.*688322/}).click();await page.locator('.company-detail').scrollIntoViewIfNeeded();await caption('公司归属看具体证据：集团收入、产品收入、机器人收入分别记录');await pause(6000);
await page.getByRole('button',{name:/3D视觉传感器.*E4/}).click();await caption('E4：3D视觉产品收入可追溯到年报第49页，但不能全部归为机器人收入');await pause(10000);await page.getByRole('button',{name:'关闭证据详情'}).click();
await page.getByRole('button',{name:/机器人视觉业务.*E3/}).click();await caption('E3：机器人业务已有收入陈述，未单列金额；不自动编造收入占比');await pause(8000);await page.getByRole('button',{name:'关闭证据详情'}).click();
await page.getByRole('button',{name:'跨市场比较',exact:true}).click();await page.getByRole('button',{name:'六维力感知',exact:true}).click();await page.evaluate(()=>scrollTo(0,0));await caption('中外比较：柯力与ATI的六维力功能可比，Novanta集团财务不可直接套用');await pause(10000);
await page.getByRole('button',{name:'事件与传导',exact:true}).click();await page.evaluate(()=>scrollTo(0,0));await caption('外部变化 → 环节 → 公司业务 → 经营驱动 → 财务指标，同时列出条件与反证');await pause(8000);
await page.getByText('售价变化（%）',{exact:true}).locator('input').fill('-30');await page.locator('.scenario-panel').scrollIntoViewIfNeeded();await caption('假设交付量增加20%、单价下降30%：收入反而下降。情景计算不是公司预测');await pause(10000);
await page.getByRole('button',{name:'证据与来源',exact:true}).click();await page.evaluate(()=>scrollTo(0,0));await caption('数据来源透明：官方年报、公司官网与政府文件；扶摇和iFinD未接入，如实披露');await pause(8000);
await page.getByRole('button',{name:'持续更新',exact:true}).click();await page.evaluate(()=>scrollTo(0,0));await caption('新增官方材料：填写公司、具体关系、来源日期、页码与相关原文');await pause(6000);
await page.getByRole('button',{name:'提取并验证证据',exact:true}).click();await caption('真实调用Kimi：结构化提取，并检查原文引用和业务阶段');await page.getByText('原文精确匹配通过',{exact:false}).waitFor({timeout:55000});
await caption('引用匹配通过仍需用户复核：销量证据保留E3，不冒充已披露收入');await pause(8000);
await page.getByLabel('我已核对原文、业务阶段与财务口径').check();await page.getByRole('button',{name:'确认并保存研究版本',exact:true}).click();await page.locator('.history').scrollIntoViewIfNeeded();await caption('确认后保留历史、模型、提示词版本与输入哈希，可导出研究版本继续更新');await pause(8000);
await page.getByRole('button',{name:'导出研究版本',exact:true}).click();await caption('交付：可操作Web、源码与README、测试说明、AI验证记录。证据不足也有明确边界');await pause(6000);
const video=page.video();await context.close();const original=await video.path();await fs.copyFile(original,'outputs/具身证据台_实际操作演示.webm');await browser.close();console.log('Recorded real browser demonstration: outputs/具身证据台_实际操作演示.webm');
