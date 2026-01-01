import { ArtistItem, PlayHistoryItem, TrackItem } from "@/types/types";

export function buildSignals({
  topTracks,
  topArtists,
  recentlyPlayed,
}: {
  topTracks: TrackItem[];
  topArtists: ArtistItem[];
  recentlyPlayed: PlayHistoryItem[];
}) {
  const topArtistName = topArtists[0]?.name;

  const obsessionScore =
    topTracks.filter((t) => t.artists.some((a: string) => a === topArtistName))
      .length / topTracks.length;

  const nightPlays = recentlyPlayed.filter(
    (p) => p.hour >= 0 && p.hour <= 4
  ).length;

  const nightOwl = nightPlays / recentlyPlayed.length > 0.4;

  const avgPopularity =
    topTracks.reduce((s, t) => s + t.popularity, 0) / topTracks.length;

  const genres = topArtists.flatMap((a) => a.genres);

  const sadBoi = genres.some((g) =>
    ["sad", "melancholic", "filmi"].some((k) => g.includes(k))
  );

  return {
    topArtistName,
    obsessionScore,
    nightOwl,
    avgPopularity,
    sadBoi,
  };
}
