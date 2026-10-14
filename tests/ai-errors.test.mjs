import test from 'node:test';import assert from 'node:assert/strict';
import {validateAnswer,providerError} from '../lib/ai-validation.mjs';
const valid={summary:'公开证据显示已有销售，金额未量化',boundary:'集团收入不能替代机器人收入',findings:[{kind:'事实',text:'有销售证据',evidenceIds:['E-KL-F']},{kind:'待验证',text:'需进一步单列财务',evidenceIds:[]}]};
test('valid answer with pending questions accepted',()=>assert.equal(validateAnswer(valid,['E-KL-F']),valid));
test('fabricated evidence IDs rejected',()=>assert.throws(()=>validateAnswer({...valid,findings:[{kind:'事实',text:'假的结论',evidenceIds:['UNKNOWN']}]},['E-KL-F'])));
test('facts without evidence rejected',()=>assert.throws(()=>validateAnswer({...valid,findings:[{kind:'事实',text:'没证据的事实',evidenceIds:[]}]},['E-KL-F'])));
for(const [kind,status] of [['AI_NOT_CONFIGURED',503],['UPSTREAM_401',502],['UPSTREAM_429',503],['UPSTREAM_500',502],['AI_TRUNCATED',422],['AI_BAD_FORMAT',422],['TimeoutError',504]])test('provider error '+kind,()=>assert.equal(providerError(kind).status,status));
