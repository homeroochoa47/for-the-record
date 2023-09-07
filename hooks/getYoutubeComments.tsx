import axios from 'axios';

import {db} from "@/db";
import {comments} from "@/db/schema";
import {eq} from "drizzle-orm";

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
  textDisplay: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
}

interface artist {
  name: string
}

export async function getYoutubeComments(songName: string, artists: artist[], spotifyID: string) {
  const artistNames = artists.map((artistArray) => artistArray.name);
  const searchQuery = [songName, ...artistNames].join(' ');

  const youtubeVideoSearchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=relevance&q=${searchQuery}&topicId=%2Fm%2F04rlf%09&type=video&key=${process.env.YOUTUBE_API_KEY}`;
  try {
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
        const youtubeCommentSearchUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=25&moderationStatus=published&order=relevance&textFormat=html&videoId=${videoID}&key=${process.env.YOUTUBE_API_KEY}`;

        try {
          const commentResponse = await axios.get(youtubeCommentSearchUrl)
          
          // 200 means comments were enabled on this video.
          if (commentResponse?.status === 200) {
            const commentData = commentResponse.data

            const extractedComments = commentData.items.map((comment: CommentData) => {
              const commentText = comment?.snippet?.topLevelComment?.snippet?.textDisplay;
              if (commentText && commentText.length < 300) {
                return {
                  textDisplay: comment.snippet.topLevelComment.snippet.textDisplay,
                  authorDisplayName: comment.snippet.topLevelComment.snippet.authorDisplayName,
                  authorProfileImageUrl: comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                };
              }
              return null; // Return null for comments that don't meet the criteria
            }).filter(Boolean); // Filter out null values

            // Add the extracted comments to the commentList
            commentList.push(...extractedComments);
          }
        } catch (error) {
          console.log(`Comments are disabled for video ${videoID}. Skipping...`);
        }

        // Check if we've reached the limit of 25 comments
        if (commentList.length >= 20) {
          break;
        }
      }

      // if there were no comments, return an error
      if (commentList.length === 0) {
        throw new Error('No comments found in any of the videos.');
      }

      const dbCommentData = commentList.map(comment => ({
        commentText: comment.textDisplay,
        youtubeDisplayName: comment.authorDisplayName,
        youtubeUserProfileURL: comment.authorProfileImageUrl,
        isYoutubeComment: true,
        spotiySongId: spotifyID,
      }));
      
      try {
        await db.insert(comments).values(dbCommentData);
        console.log('Comments added to the database');
      } catch (error) {
        console.error('Error:', error);
      }
      
    } else {
      // Handle Errors for the initial video search
      throw new Error('Failed to fetch data from video search')
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
