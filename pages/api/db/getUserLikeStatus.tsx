import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

import { db } from "@/db";
import { likes, comments } from "@/db/schema";
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
    // receive like data from comment component
    const {userID, id} = req.body
    
    // check if this user's ID is associated with a like for the comment ID. Will return a like item from the likes table if it exists.
    const likeStatus = await db.select().from(likes).where(and(eq(likes.userID, userID), eq(likes.commentID, id)))
    
    // return a boolean to the frontend depending on whether there was a like item found
    const isCommentLiked = likeStatus.length > 0
    
    // Return the new song and comments to the client
    return res.status(200).json(isCommentLiked);
  } catch (error) {
    // Handle any Axios or other errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
