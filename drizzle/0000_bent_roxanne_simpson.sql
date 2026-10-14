CREATE TABLE `research_records` (
	`id` text PRIMARY KEY NOT NULL,
	`relation_key` text NOT NULL,
	`input_hash` text NOT NULL,
	`document_date` text NOT NULL,
	`record_json` text NOT NULL,
	`confirmed_at` text NOT NULL,
	`version` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `research_record_dedup` ON `research_records` (`relation_key`,`input_hash`);