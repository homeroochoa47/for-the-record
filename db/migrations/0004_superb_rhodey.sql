ALTER TABLE `comments` ADD `is_youtube_comment` boolean;--> statement-breakpoint
ALTER TABLE `comments` ADD `youtube_display_name` text;--> statement-breakpoint
ALTER TABLE `comments` ADD `youtube_user_profile_url` text;