"use client";
import { Button } from "@/components/ui/button";
import { generateRoasts } from "@/lib/spotify-roast-engine/roast-rules";
import { buildSignals } from "@/lib/spotify-roast-engine/spotify-signals";
import { ArtistItem, PlayHistoryItem, TrackItem } from "@/types/types";
import { useState } from "react";

export const RoastComponent = () => {
  const [roasts, setRoasts] = useState<string[]>([]);

  const getRoast = async () => {
    const topTracks: TrackItem[] = await fetch("api/spotify/top-tracks").then(
      (res) => res.json()
    );
    const topArtists: ArtistItem[] = await fetch(
      "api/spotify/top-artists"
    ).then((res) => res.json());
    const recentlyPlayed: PlayHistoryItem[] = await fetch(
      "api/spotify/recently-played"
    ).then((res) => res.json());

    const signals = buildSignals({ topTracks, topArtists, recentlyPlayed });

    const roasts = generateRoasts(signals);
    setRoasts(roasts);
  };

  return (
    <div className="p-4 border rounded-md w-full">
      <h1>Welcome to the Roast Page</h1>
      <div className="space-y-4 flex items-center justify-center w-full mt-4 flex-col">
        <Button onClick={getRoast}>Get Roast</Button>
        {roasts.map((roast, index) => (
          <p key={index}>{roast}</p>
        ))}
      </div>
    </div>
  );
};
