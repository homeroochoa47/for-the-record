CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`commentText` text NOT NULL,
	`songID` mediumint NOT NULL,
	`likes` smallint DEFAULT 0,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userID` mediumint NOT NULL,
	`commentID` int NOT NULL,
	CONSTRAINT `likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` mediumint AUTO_INCREMENT NOT NULL,
	`spotifyId` varchar(128) NOT NULL,
	`songName` varchar(255) NOT NULL,
	`artistName` varchar(255) NOT NULL,
	`albumName` varchar(255) NOT NULL,
	`smallAlbumCoverURL` varchar(128),
	`mediumAlbumCoverURL` varchar(128),
	`largeAlbumCoverURL` varchar(128),
	CONSTRAINT `songs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clerkUserID` varchar(255) NOT NULL,
	`spotifyUserId` varchar(128) NOT NULL,
	`spotifyDisplayName` varchar(128),
	`profileImageURL` varchar(128),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_songID_songs_id_fk` FOREIGN KEY (`songID`) REFERENCES `songs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_userID_users_id_fk` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `likes` ADD CONSTRAINT `likes_commentID_comments_id_fk` FOREIGN KEY (`commentID`) REFERENCES `comments`(`id`) ON DELETE no action ON UPDATE no action;