import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

import { db } from "@/db";
import { songs } from "@/db/schema";
import { eq } from "drizzle-orm";

interface YouTubeApiSearchResponse {
  items: {
    id: {
      videoId: string;
    };
  }[];
}

interface CommentData {
  snippet: {
    topLevelComment: {
      snippet: {
        textDisplay: string;
        authorDisplayName: string;
        authorProfileImageUrl: string;
      }
    }
  }
}

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
    // Searching for a list of videos matching the videos
    const videoSearchQuery = "ty dolla $ign time will tell"
    const youtubeVideoSearchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=${videoSearchQuery}&topicId=%2Fm%2F04rlf%09&type=video&key=${process.env.YOUTUBE_API_KEY}`;

    // Make the Axios GET request to the API
    const response = await axios.get<YouTubeApiSearchResponse>(youtubeVideoSearchUrl);

    // Successfully received video IDs
    if (response.status === 200) {
      const videoItems = response.data.items;
      const videoIDs = videoItems.map(item => item.id.videoId);

      const commentList: CommentData[] = [];

      // Loop through video ids. 
      for (const videoID of videoIDs) {

        //Params: maxresults = 30, part = snippet, order = relevance, format = htmltext
        const youtubeCommentSearchUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=30&moderationStatus=published&order=relevance&textFormat=html&videoId=${videoID}&key=${process.env.YOUTUBE_API_KEY}`;

        const commentResponse = await axios.get(youtubeCommentSearchUrl);

        // 200 means comments were enabled on this video.
        if (commentResponse.status === 200) {
          const commentData = commentResponse.data
          const extractedComments = commentData.items.map((comment: CommentData) => {
            if (comment.snippet.topLevelComment.snippet.textDisplay.length < 300) {
              return {
                textDisplay: comment.snippet.topLevelComment.snippet.textDisplay,
                authorDisplayName: comment.snippet.topLevelComment.snippet.authorDisplayName,
                authorProfileImageUrl: comment.snippet.topLevelComment.snippet.authorProfileImageUrl
              };
            }
          });

          // Add the extracted comments to the commentList
          commentList.push(...extractedComments);
        } else {
          // There was an error, meaning there wasnt any comments
          console.error(`Failed to fetch comments for video ${videoID}. Status code: ${commentResponse.status}`);
        }

        // Check if we've reached the limit of 25 comments
        if (commentList.length >= 25) {
          break;
        }
      }

      // Now, `commentList` contains an array of extracted comments
      // console.log(commentList);

      // if there were no comments, return an error
      if (commentList.length === 0) {
        res.status(404).json({ error: 'No comments found in any of the videos.' });
      } else {
        // Return the commentList if it contains comments
        res.status(200).json(commentList);
      }

    } else {
      // Handle Errors for the initial video search
      res.status(response.status).json({ error: 'Failed to fetch data from video search' });
    }

  } catch (error) {
    // Handle any Axios or other errors
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
