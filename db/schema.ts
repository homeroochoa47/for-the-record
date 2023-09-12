import { int, mysqlTable, varchar, text, mediumint, smallint, json, boolean } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
 
export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),
  clerkUserID: varchar('clerkUserID', {length: 255}).notNull(),
  spotifyUserID: varchar('spotifyUserId', {length: 128}).notNull(),
  spotifyDisplayName: varchar('spotifyDisplayName', {length: 128}),
  profileImageURL: varchar('profileImageURL', {length: 255}),
});

export const usersRelations = relations(users, ({ many }) => ({
  likes: many(likes),
  comments: many(comments)
}))

export const songs = mysqlTable('songs', {
  id: mediumint('id').autoincrement().primaryKey(),
  spotifyId:varchar('spotify_id', {length: 128}).notNull(),
  songName: varchar('song_name', {length: 255}).notNull(),
  artistNames: json('artist_names').$type<string[]>().notNull(),
  albumName: varchar('album_name', {length: 255}).notNull(),
  // smallAlbumCoverURL: varchar('small_album_cover_URL', {length: 128}),
  // mediumAlbumCoverURL: varchar('medium_album_cover_URL', {length: 128}),
  albumCoverURL: varchar('album_cover_URL', {length: 128}),
});

export const songsRelations = relations(songs, ({ many }) => ({
  comments: many(comments)
}))

export const comments = mysqlTable('comments', {
  id: int('id').autoincrement().primaryKey(),
  spotifyUserID: varchar('spotify_user_id', {length: 128}),
  commentText: text('comment_text').notNull(),
  spotiySongId: varchar('spotiy_song_id', {length: 128}).notNull(),
  likes: smallint('likes').default(0),
  isYoutubeComment: boolean('is_youtube_comment'),
  youtubeDisplayName: varchar('youtube_display_name', {length: 128}),
  youtubeUserProfileURL: varchar('youtube_user_profile_url', {length: 128})
})

export const commentsRelations = relations(comments, ({one, many}) => ({
  song: one(songs, {
    fields: [comments.spotiySongId], 
    references: [songs.spotifyId],
  }),
  user: one(users, {
    fields: [comments.spotifyUserID], 
    references: [users.spotifyUserID],
  }),
  likes: many(likes)
}))

export const likes = mysqlTable('likes', {
  id: int('id').autoincrement().primaryKey(),
  userID: varchar('user_id', {length: 128}).notNull(),
  commentID: int('comment_id').notNull(),
})

export const likesRelations = relations(likes, ({one}) => ({
  comment: one(comments, {
    fields: [likes.commentID], 
    references: [comments.id],
  }),
  users: one(users, {
    fields: [likes.userID],
    references: [users.spotifyUserID]
  })
}))
