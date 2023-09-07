ALTER TABLE `songs` RENAME COLUMN `artist_name` TO `artist_names`;--> statement-breakpoint
ALTER TABLE `songs` MODIFY COLUMN `artist_names` json NOT NULL;