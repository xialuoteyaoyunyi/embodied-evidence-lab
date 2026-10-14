import fs from 'node:fs';import {fetchFuyaoResearch} from '../lib/fuyao.mjs';
const response=await fetchFuyaoResearch(process.env.FUYAO_API_KEY);
// Private raw capture for traceability; never commit commercial provider responses.
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync('outputs/fuyao-verification.json',JSON.stringify(response,null,2));
const record={verifiedAt:response.retrievedAt,provider:'fuyao',sampleCodes:['003021.SZ','603662.SH','688322.SH'],requests:response.results.map(r=>({kind:r.kind,status:r.status,endpoint:r.endpoint,requestId:r.requestId,sourceTimestamp:r.sourceTimestamp,itemCount:r.items?.length,missingCodes:r.missingCodes,error:r.error})),rawRecord:'outputs/fuyao-verification.json (ignored, private)',scope:'Group consolidated financials; no robot business revenue inferred'};
fs.writeFileSync('docs/fuyao-validation.json',JSON.stringify(record,null,2));console.log(JSON.stringify(record));
