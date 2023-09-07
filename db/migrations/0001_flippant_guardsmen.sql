ALTER TABLE `comments` RENAME COLUMN `commentText` TO `comment_text`;--> statement-breakpoint
ALTER TABLE `comments` RENAME COLUMN `songID` TO `song_id`;--> statement-breakpoint
ALTER TABLE `likes` RENAME COLUMN `userID` TO `user_id`;--> statement-breakpoint
ALTER TABLE `likes` RENAME COLUMN `commentID` TO `comment_id`;--> statement-breakpoint
ALTER TABLE `songs` RENAME COLUMN `spotifyId` TO `spotify_id`;--> statement-breakpoint
ALTER TABLE `songs` RENAME COLUMN `songName` TO `song_name`;--> statement-breakpoint
ALTER TABLE `songs` RENAME COLUMN `artistName` TO `artist_name`;--> statement-breakpoint
ALTER TABLE `songs` RENAME COLUMN `albumName` TO `album_name`;--> statement-breakpoint
ALTER TABLE `songs` RENAME COLUMN `smallAlbumCoverURL` TO `small_album_cover_URL`;--> statement-breakpoint
ALTER TABLE `songs` RENAME COLUMN `mediumAlbumCoverURL` TO `medium_album_cover_URL`;--> statement-breakpoint
ALTER TABLE `songs` RENAME COLUMN `largeAlbumCoverURL` TO `large_album_cover_URL`;--> statement-breakpoint
ALTER TABLE `comments` DROP FOREIGN KEY `comments_songID_songs_id_fk`;
--> statement-breakpoint
ALTER TABLE `likes` DROP FOREIGN KEY `likes_userID_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `likes` DROP FOREIGN KEY `likes_commentID_comments_id_fk`;
