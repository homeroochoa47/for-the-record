export default interface SpotifyTrackInfo {
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  item: {
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
  isPlaying: boolean;
  currentlyPlayingType: string;
  spotifyID: string;
}

export type commentCardData = {
  commentText: string;
  likes: number;
  youtubeDisplayName: string;
  youtubeUserProfileURL: string;
  spotifyUserID: string;
  spotiySongId: string;
  isYoutubeComment: boolean
  id: number
};

export type UserContextType = {
  userID: string | null;
  setUserID: (userID: string | null) => void;
};

export type User = {
  spotifyUserID: string
  profileImageURL: string
  spotifyDisplayName: string
}
