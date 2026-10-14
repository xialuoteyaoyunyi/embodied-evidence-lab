import fs from 'node:fs';
const p='.env.local';let value=fs.readFileSync(p,'utf8');if(value.includes('GITHUB_TOKEN=')===false){value+='\nGITHUB_TOKEN=\n';fs.writeFileSync(p,value);}console.log('Upload field prepared; credential values not displayed');
