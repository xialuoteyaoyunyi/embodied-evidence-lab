import { AsyncLocalStorage } from 'node:async_hooks';
const storage = new AsyncLocalStorage<Record<string, unknown>>();
export function runWithResearchEnv<T>(env:Record<string,unknown>,fn:()=>T):T {return storage.run(env,fn);}
export function researchEnv(name:string):string {const v=storage.getStore()?.[name];return typeof v==='string'?v:process.env[name]||'';}
export function researchBinding<T>(name:string):T|undefined{return storage.getStore()?.[name] as T|undefined;}
