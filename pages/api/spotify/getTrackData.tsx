import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from '@/hooks/getToken';
import { getAuth } from '@clerk/nextjs/server';
import { getCookie, setCookie } from 'cookies-next';

import {db} from "@/db";
import {songs} from "@/db/schema";
import {eq} from "drizzle-orm";
import { getYoutubeComments } from '@/hooks/getYoutubeComments';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  // Check auth from clerk
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    let accessToken = getCookie('spotifyAccessToken', { req, res });

    // check if the spotify token is saved in the cookies, get a new one if not
    if (!accessToken) {
      accessToken = await getToken(userId);
      setCookie('spotifyAccessToken', accessToken, { req, res, httpOnly: true, maxAge: 60 * 60 });
    }
    
    const apiUrl = 'https://api.spotify.com/v1/me/player';
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }

    // Make the Axios GET request to the API
    const response = await axios.get(apiUrl, config);

    if (response.status === 204) {
      // If the response is 204, treat it as a data not found scenario
      res.status(404).send({ error: 'Playback not available or active' });
    } else if (response.status === 200) {

      // Extract only the desired properties
      const { context, item, is_playing: isPlaying, currently_playing_type: currentlyPlayingType } = response.data;
      const spotifyID = item.id

      // *********************
      // Check if currentlyPlayingType is !track. Return an error if not
      // *********************

      // Create a new object with the extracted properties
      const trackData = {
        context,
        item,
        isPlaying,
        currentlyPlayingType,
        spotifyID
      };

      // check if this song is in the databse
      const dbSong = await db.select().from(songs).where(eq(songs.spotifyId, spotifyID));
      // if not add add it in
      if (dbSong.length === 0) {

        const dbSongData = [
          {
            spotifyId: item.id,
            songName: item.name,
            artistNames: item.artists,
            albumName: item.album.name,
            albumCoverURL: item.album.images[0],
          },
        ];

        try {
          await getYoutubeComments(item.name, item.artists, item.id)
          await db.insert(songs).values(dbSongData).then(() => {
            console.log('Song added to database'); // This message will be logged when the operation is completed successfully
          }).catch((error) => {
            console.error('Error while adding song to database:', error);
            return // Handle any errors that occur during the operation
          });
        } catch (error) {
          console.error('Error adding songs', error)
        }

      }

      res.status(200).json(trackData);
    }

  } catch (error) {
    // Handle any Axios or other errors
    // console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
