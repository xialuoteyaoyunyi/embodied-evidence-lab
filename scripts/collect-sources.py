"""Download public annual reports for local verification only; no secrets."""
import pathlib, urllib.request, json, hashlib
from pypdf import PdfReader
root = pathlib.Path(__file__).resolve().parents[1]
dest = root / 'work' / 'sources'
dest.mkdir(parents=True, exist_ok=True)
sources = {
 'zhaowei': 'https://static.cninfo.com.cn/finalpage/2026-03-31/1225057987.PDF',
 'keli': 'https://static.cninfo.com.cn/finalpage/2026-04-28/1225199660.PDF',
 'orbbec': 'https://static.cninfo.com.cn/finalpage/2026-04-20/1225123796.PDF',
}
for name,url in sources.items():
 path = dest / (name+'.pdf')
 if not path.exists():
  req = urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=90) as r: path.write_bytes(r.read())
 reader = PdfReader(path)
 pages = [{'page': i+1,'text':p.extract_text()} for i,p in enumerate(reader.pages)]
 (dest/(name+'.json')).write_text(json.dumps(pages,ensure_ascii=False),encoding='utf-8')
 print(name, len(pages), hashlib.sha256(path.read_bytes()).hexdigest())
 if name=='orbbec':
  for p in pages[:35]:
   if '营业收入' in p['text'] or '机器人' in p['text']:
    print('PAGE',p['page'],p['text'][:4500])
