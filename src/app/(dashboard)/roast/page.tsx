"use client";
import { Button } from "@/components/ui/button";
import { generateRoasts } from "@/lib/spotify-roast-engine/roast-rules";
import { buildSignals } from "@/lib/spotify-roast-engine/spotify-signals";
import { ArtistItem, PlayHistoryItem, TrackItem } from "@/types/types";
import { useState } from "react";

const RoastPage = () => {
  const [roasts, setRoasts] = useState<string[]>([]);

  const getRoast = async () => {
    // Logic to get roast data
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
    console.log(roasts);
    
    setRoasts(roasts);
  };

  return (
    <div>
      <h1>Welcome to the Roast Page</h1>
      <div>
        <Button onClick={getRoast}>Get Roast</Button>
        {roasts.map((roast, index) => (
          <p key={index}>{roast}</p>
        ))}
      </div>
    </div>
  );
};

export default RoastPage;
