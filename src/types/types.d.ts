export interface Album {
  name: string;
  image: string;
}

export interface TrackItem {
  id: string;
  name: string;
  artists: string[];
  popularity: number;
  durationMs: number;
  previewUrl: string | null;
  album: Album;
}
export interface ArtistItem {
  rank: number;
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: number;
  image: string;
}

export interface PlayHistoryItem {
  track: string;
  artists: string[];
  playedAt: string;
  hour: number;
  popularity: number;
}

export interface Signals {
  topArtistName: string;
  obsessionScore: number;
  nightOwl: boolean;
  avgPopularity: number;
  sadBoi: boolean;
}
