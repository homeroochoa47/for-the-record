import { getToken } from '@/hooks/getToken';
import { getAuth } from '@clerk/nextjs/server';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import {db} from "@/db";
import {users} from "@/db/schema";
import {eq} from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  // first we check authentication from clerk
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // check if this user is in the databse
  const dbUser = await db.select().from(users).where(eq(users.clerkUserID, userId));
  
  // if not add them and return their data
  if (dbUser.length === 0) {
    
    try {
      let accessToken = getCookie('spotifyAccessToken', { req, res });
      
      // Check if their spotify access token is already retrieved, getting a new one if not
      if (!accessToken) {
        accessToken = await getToken(userId);
        setCookie('spotifyAccessToken', accessToken, { req, res, httpOnly: true,  maxAge: 60 * 60 });
      }
  
      const spotifyApiUrl = 'https://api.spotify.com/v1/me';
  
      const response = await fetch(spotifyApiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      // If the request fails
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch Spotify profile data. Status:', response.status, 'Response:', errorText);
        return res.status(response.status).json({ error: 'Failed to fetch Spotify profile data' });
      }
      
      // If its succesful
      const profileData = await response.json();
      // console.log(profileData)
      const dbUserData = [
        {
          clerkUserID: userId,
          spotifyUserID: profileData.id,
          spotifyDisplayName: profileData.display_name,
          profileImageURL: profileData.images[0].url,
        },
      ];
      
      await db.insert(users).values(dbUserData).then(() => {
        console.log('Success'); // This message will be logged when the operation is completed successfully
      }).catch((error) => {
        console.error('Error:', error); // Handle any errors that occur during the operation
      });

      return res.status(200).json(dbUserData);
    } catch (error) {
      console.error('Error fetching Spotify profile data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }    
  }
  return res.status(200).json(dbUser[0]);

}
