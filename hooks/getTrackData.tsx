import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SpotifyTrackInfo from '@/types'

// global state for track data using react
export const getTrackData = () => {
  return useQuery(
    ['trackData'],
    async () => {
      const response = await axios.get('/api/spotify/getTrackData');
      const data = response.data;
      return data
    },
    {
      refetchOnWindowFocus: false, 
      staleTime: Infinity
    }
  )
}

export const getTrackComments = (trackData: SpotifyTrackInfo ) => {
  const generateQueryKey = () => {
    if (trackData) {
      return ['trackComments', trackData.spotifyID];
    } else {
      return ['trackComments'];
    }
  };

  return useQuery(
    generateQueryKey(),
    async () => {
      try {
        const response = await axios.post('/api/db/getTrackComments', trackData);
        const data = response.data;
        return data; 
      } catch (error) {
        console.error('Error sending POST request:', error);
        // Handle the error and send an appropriate response
        return { error: 'Internal server error' };
      }
    },
    {
      enabled: !!trackData,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  )
}

