ALTER TABLE `songs` ADD `album_cover_URL` varchar(128);--> statement-breakpoint
ALTER TABLE `songs` DROP COLUMN `small_album_cover_URL`;--> statement-breakpoint
ALTER TABLE `songs` DROP COLUMN `medium_album_cover_URL`;--> statement-breakpoint
ALTER TABLE `songs` DROP COLUMN `large_album_cover_URL`;