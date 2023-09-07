import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { userId } = getAuth(req);

  // Check auth from clerk
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // Assuming you have a 'song' object in your request body
    const songData = req.body;

    const spotifyID = songData.spotifyID

    // get comments where the spotify id = the spotify ID from above
    const songComments = await db.select().from(comments).where(eq(comments.spotiySongId, spotifyID));

    // Return the new song and comments to the client
    res.status(200).json(songComments);
  } catch (error) {
    // Handle any Axios or other errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
