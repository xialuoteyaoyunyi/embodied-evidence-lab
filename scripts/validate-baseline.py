import json,re,pathlib,hashlib
root=pathlib.Path(__file__).resolve().parents[1]
checks=[('zhaowei',7,'1,715,534,329.63'),('zhaowei',21,'批量化生产工作持续推进'),('keli',8,'1,558,438,867.20'),('keli',12,'战略投资'),('keli',12,'1500'),('orbbec',9,'940,743,637.65'),('orbbec',48,'机器人业务收入增长'),('orbbec',49,'290,934,711.69')]
results=[]
for company,page,needle in checks:
 data=json.loads((root/'work/sources'/f'{company}.json').read_text(encoding='utf-8'))
 text=data[page-1]['text']
 ok=re.sub(r'\s','',needle) in re.sub(r'\s','',text)
 results.append({'company':company,'pdfPage':page,'valueOrKeyword':needle,'passed':ok})
 assert ok,(company,page,needle)
dest=root/'docs';dest.mkdir(exist_ok=True)
(dest/'baseline-validation.json').write_text(json.dumps({'verifiedAt':'2026-10-14','method':'PDF文本定位与数值核验；空白规范化，不代表独立业务审计','checks':results},ensure_ascii=False,indent=2),encoding='utf-8')
print('All',len(results),'baseline values and locators matched official PDFs')
