import { ArtistItem, PlayHistoryItem, Signals, TrackItem } from "@/types/types";

export function buildSignals({
  topTracks,
  topArtists,
  recentlyPlayed,
}: {
  topTracks: TrackItem[];
  topArtists: ArtistItem[];
  recentlyPlayed: PlayHistoryItem[];
}): Signals & { obsessionLevel: "none" | "mild" | "severe" } {
  if (!topTracks.length || !topArtists.length || !recentlyPlayed.length) {
    return {
      topArtistName: topArtists[0]?.name ?? "Unknown",
      obsessionScore: 0,
      obsessionLevel: "none",
      nightOwl: false,
      avgPopularity: 0,
      sadBoi: false,
    };
  }

  const topArtistName = topArtists[0].name;

  const obsessionScore =
    topTracks.filter((t) =>
      t.artists.some((a) => a.toLowerCase() === topArtistName.toLowerCase())
    ).length / topTracks.length;

  let obsessionLevel: "none" | "mild" | "severe" = "none";
  if (obsessionScore > 0.25) obsessionLevel = "mild";
  if (obsessionScore > 0.5) obsessionLevel = "severe";

  const nightPlays = recentlyPlayed.filter(
    (p) => p.hour >= 0 && p.hour <= 4
  ).length;

  const nightRatio = nightPlays / recentlyPlayed.length;
  const nightOwl = nightPlays >= 10 && nightRatio > 0.35;

  const avgPopularity =
    topTracks.reduce((s, t) => s + t.popularity, 0) / topTracks.length;

  const genres = topArtists.flatMap((a) => a.genres);

  const SAD_KEYWORDS = [
    "sad",
    "melancholic",
    "filmi",
    "bollywood",
    "lofi",
    "heartbreak",
    "emo",
  ];

  const sadBoi = genres.some((g) =>
    SAD_KEYWORDS.some((k) => g.toLowerCase().includes(k))
  );

  return {
    topArtistName,
    obsessionScore,
    obsessionLevel,
    nightOwl,
    avgPopularity,
    sadBoi,
  };
}
