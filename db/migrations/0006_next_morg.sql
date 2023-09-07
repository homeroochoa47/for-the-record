ALTER TABLE `comments` RENAME COLUMN `song_id` TO `spotiy_song_id`;--> statement-breakpoint
ALTER TABLE `comments` ADD `spotify_user_id` varchar(128);