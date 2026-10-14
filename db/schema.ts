// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import {sqliteTable,text,integer,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const researchRecords=sqliteTable('research_records',{
 id:text('id').primaryKey(),relationKey:text('relation_key').notNull(),inputHash:text('input_hash').notNull(),
 documentDate:text('document_date').notNull(),recordJson:text('record_json').notNull(),
 confirmedAt:text('confirmed_at').notNull(),version:integer('version').notNull()
},t=>[uniqueIndex('research_record_dedup').on(t.relationKey,t.inputHash)]);
