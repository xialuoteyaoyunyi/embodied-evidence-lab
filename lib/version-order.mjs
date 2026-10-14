/** Publication date wins. Same-date extractions use the signed server creation time. */
export function compareRecordVersion(a,b){return String(a?.input?.date||'').localeCompare(String(b?.input?.date||''))||String(a?.createdAt||'').localeCompare(String(b?.createdAt||''))||String(a?.inputSha256||'').localeCompare(String(b?.inputSha256||''));}
