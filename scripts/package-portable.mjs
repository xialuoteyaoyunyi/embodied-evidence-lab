/** Portable Windows fallback, reuses Sites' official build preparation. */
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import {spawnSync} from 'node:child_process';import {isDeepStrictEqual} from 'node:util';
const [helper,archive]=process.argv.slice(2);if(!helper||!archive||!path.isAbsolute(helper)||!path.isAbsolute(archive))throw new Error('Provide absolute official prepare-site-build.cjs path and archive path');
const project=process.cwd(),stage=fs.mkdtempSync(path.join(os.tmpdir(),'embodied-site-package-'));
const r=spawnSync(process.execPath,[helper,project,path.join(stage,'dist')],{encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr||'Official build preparation failed');const kind=r.stdout.trim();
const src=JSON.parse(fs.readFileSync('.openai/hosting.json','utf8'));const bp='dist/.openai/hosting.json';const built=fs.existsSync(bp)?JSON.parse(fs.readFileSync(bp,'utf8')):{};
if(src.artifact_metadata&&built.artifact_metadata&&!isDeepStrictEqual(src.artifact_metadata,built.artifact_metadata))throw new Error('Conflicting artifact attribution');
fs.mkdirSync(path.join(stage,'dist','.openai'),{recursive:true});const out=kind==='worker'?src:JSON.parse(fs.readFileSync(path.join(stage,'dist','.openai','hosting.json'),'utf8'));if(built.artifact_metadata||src.artifact_metadata)out.artifact_metadata=built.artifact_metadata||src.artifact_metadata;
fs.writeFileSync(path.join(stage,'dist','.openai','hosting.json'),JSON.stringify(out,null,2));
if(fs.existsSync('drizzle'))fs.cpSync('drizzle',path.join(stage,'dist','.openai','drizzle'),{recursive:true});fs.mkdirSync(path.dirname(archive),{recursive:true});
const tar=spawnSync(process.platform==='win32'?'C:/Windows/System32/tar.exe':'tar',['-C',stage,'-czf',archive,'dist'],{encoding:'utf8'});if(tar.status!==0)throw new Error(tar.stderr);
const check=spawnSync(process.platform==='win32'?'C:/Windows/System32/tar.exe':'tar',['-tzf',archive],{encoding:'utf8'});if(check.status!==0||!check.stdout.split(/\r?\n/).includes('dist/.openai/hosting.json'))throw new Error('Archive manifest missing');
console.log(JSON.stringify({archive,kind,validated:true}));
