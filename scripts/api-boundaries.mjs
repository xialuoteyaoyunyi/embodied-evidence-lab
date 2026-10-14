import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const base='http://127.0.0.1:5173';const tests=[];
async function check(name,path,options,status){const r=await fetch(base+path,options);const raw=await r.text();let body;try{body=JSON.parse(raw);}catch{body={message:raw};}assert.equal(r.status,status,name);tests.push({name,status:r.status,passed:true});return body;}
await check('cross-origin request denied','/api/ai',{method:'POST',headers:{Origin:'https://untrusted.invalid'},body:'{}'},403);
await check('malformed JSON denied','/api/ai',{method:'POST',body:'{'},400);
await check('unknown mode denied','/api/ai',{method:'POST',body:'{"mode":"trade"}'},400);
await check('trade advice denied','/api/ai',{method:'POST',body:JSON.stringify({mode:'research',company:'keli',question:'给我买入建议和目标价'})},400);
await check('unapproved source denied','/api/ai',{method:'POST',body:JSON.stringify({mode:'extract',input:{company:'柯力传感',branch:'force',title:'test',url:'https://evil.invalid',date:'2026-04-28',locator:'page 1',text:'公司销售一些传感器，这段材料很长但并非来自官方域名。'}})},400);
await check('source ID injection denied','/api/source-check?id=https://127.0.0.1',undefined,400);
const health=await check('health omits secret values','/api/health',undefined,200);assert.ok(!JSON.stringify(health).includes('sk-'));
await fs.writeFile('docs/api-boundaries.json',JSON.stringify({runAt:new Date().toISOString(),tests},null,2));console.log('API boundary checks passed:',tests.length);
