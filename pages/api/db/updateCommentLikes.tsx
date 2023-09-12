import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

import { db } from "@/db";
import { likes, comments } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { userId: clerkUserID } = getAuth(req);

  // Check auth from clerk
  if (!clerkUserID) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const likeData = req.body
    
    const dbLikeData = ({
      userID: likeData.userID,
      commentID: likeData.commentID,
    })

    likeData.action === "like" ? await db.insert(likes).values(dbLikeData) : await db.delete(likes).where(and(eq(likes.userID, likeData.userID), eq(likes.commentID, likeData.commentID)))

    await db.update(comments)
    .set({ likes: likeData.newLikeCount })
    .where(eq(comments.id, likeData.commentID));

    // Return the new song and comments to the client
    return res.status(200).json("Like count updated");
  } catch (error) {
    // Handle any Axios or other errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
