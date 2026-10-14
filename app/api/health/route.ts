import {researchEnv} from '@/lib/runtime-env';
export async function GET(){return Response.json({status:'ok',aiConfigured:!!researchEnv('KIMI_API_KEY'),model:researchEnv('KIMI_MODEL')||'kimi-k2.6',accessCodeRequired:!!researchEnv('RESEARCH_ACCESS_CODE'),snapshot:'2026-10-14',dataMode:'official-public-materials',ifindConnected:false,fuyaoConnected:false},{headers:{'Cache-Control':'no-store'}});}
