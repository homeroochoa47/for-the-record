import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { userId: clerkUserID } = getAuth(req);

  // Check auth from clerk
  if (!clerkUserID) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const commentData = req.body

    const dbCommentData = ({
      spotifyUserID: commentData.spotifyUserID,
      commentText: commentData.commentText,
      spotiySongId: commentData.spotifySongID,
      likes: commentData.likes,
      isYoutubeComment: commentData.isYoutubeComment,
      youtubeDisplayName: commentData.youtubeDisplayName,
      youtubeUserProfileURL: commentData.youtubeUserProfileURL
    })

    console.log(dbCommentData)

    await db.insert(comments).values(dbCommentData);

    console.log('Comment added to db.')

    // Return the new song and comments to the client
    return res.status(200).json("Comment Added");
  } catch (error) {
    // Handle any Axios or other errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
