import test from 'node:test';import assert from 'node:assert/strict';import {validateCandidate} from '../lib/research-core.mjs';
const input={company:'柯力传感',branch:'force',concept:'机器人力学传感器',title:'官方材料',date:'2026-08-28',url:'https://static.cninfo.com.cn/test.PDF',locator:'第9页'};
const candidate={concept:input.concept,claim:'业务判断',limit:'待核验',revenue:null};
test('negated sales and future plans cannot count as current sales evidence',()=>{for(const quote of ['机器人力学传感器尚未实现销售。','机器人力学传感器没有订单。','计划下个月销售机器人力学传感器。'])assert.throws(()=>validateCandidate({...candidate,stage:'E3',quote},{...input,text:quote}),/销售级/);});
test('negative delivery with affirmative orders still supports E3, not E4',()=>{const quote='机器人力学传感器尚未交付，但已取得订单。';assert.equal(validateCandidate({...candidate,stage:'E3',quote},{...input,text:quote}).stage,'E3');});
test('undisclosed revenue plus an actual unit price does not establish business revenue',()=>{const quote='机器人力学传感器业务收入未披露，产品单价100元。';assert.throws(()=>validateCandidate({...candidate,stage:'E4',quote,revenue:{amount:'100',scope:'业务分项'}},{...input,text:quote}),/收入级/);});
