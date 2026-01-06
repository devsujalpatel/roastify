import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { buildSignals } from "@/lib/spotify-roast-engine/spotify-signals";
import { generateRoasts } from "@/lib/spotify-roast-engine/roast-rules";
import { db } from "@/config";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";
import { ArtistItem, PlayHistoryItem, TrackItem } from "@/types/types";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST() {
  try {
    // Verify authentication
    const sessionData = await auth.api.getSession({
      headers: {
        cookie: (await headers()).get("cookie") ?? "",
      },
    });

    if (!sessionData) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const userId = sessionData.user.id;

    // Check if user is invited
    const userData = await db
      .select({ isInvited: user.isInvited })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!userData.length || !userData[0].isInvited) {
      return new Response(
        JSON.stringify({
          error:
            "You are not invited. DM @sujalpatelcoder on Twitter for access.",
        }),
        { status: 403 }
      );
    }

    // Get Spotify access token
    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: "spotify",
        userId,
      },
    });

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Connect your Spotify account first" }),
        { status: 401 }
      );
    }

    // Fetch all Spotify data in parallel
    const [tracksRes, artistsRes, recentRes] = await Promise.all([
      fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=medium_term",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ),
      fetch(
        "https://api.spotify.com/v1/me/top/artists?limit=20&time_range=medium_term",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ),
      fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    if (!tracksRes.ok || !artistsRes.ok || !recentRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch Spotify data" }),
        { status: 500 }
      );
    }

    const [tracksData, artistsData, recentData] = await Promise.all([
      tracksRes.json(),
      artistsRes.json(),
      recentRes.json(),
    ]);

    // Transform the data
    const topTracks: TrackItem[] = tracksData.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((a: any) => a.name),
      popularity: track.popularity,
      durationMs: track.duration_ms,
      previewUrl: track.preview_url,
      album: {
        name: track.album.name,
        image: track.album.images?.[0]?.url,
      },
    }));

    const topArtists: ArtistItem[] = artistsData.items.map(
      (artist: any, index: number) => ({
        rank: index + 1,
        id: artist.id,
        name: artist.name,
        genres: artist.genres,
        popularity: artist.popularity,
        followers: artist.followers?.total ?? 0,
        image: artist.images?.[0]?.url,
      })
    );

    const recentlyPlayed: PlayHistoryItem[] = recentData.items.map(
      (item: any) => ({
        track: item.track.name,
        artists: item.track.artists.map((a: any) => a.name),
        playedAt: item.played_at,
        hour: new Date(item.played_at).getHours(),
        popularity: item.track.popularity,
      })
    );

    // Build signals for context
    const signals = buildSignals({ topTracks, topArtists, recentlyPlayed });

    const ruleBasedRoasts = generateRoasts(signals);

    // Create a rich prompt for the AI
    const prompt = `
You are a ruthless, unfiltered music elitist whose full-time job is to roast people's Spotify taste into dust.
You do NOT care about feelings. You roast like a sarcastic Gen-Z friend who has known them for years.
Tone: savage, mocking, brutally honest.
Language: Hinglish + English, casual Indian slang allowed.
Style: short, punchy, disrespectful but funny. No moral lectures.

Based on this user's Spotify data, generate 3–5 absolutely brutal but hilarious roasts.

RULES:
- No compliments. If something is basic, call it basic.
- If they repeat the same artist, bully them for it.
- If music is sad, act concerned but mockingly.
- If taste is mainstream, expose them.
- If taste is obscure, call them pretentious.
- Roast the person, not just the music.
- Sound like you're judging them silently since 2018.

––––––––––––––
TOP ARTISTS:
${topArtists
  .slice(0, 5)
  .map(
    (a: any, i: number) =>
      `${i + 1}. ${a.name} (${a.genres.slice(0, 3).join(", ")})`
  )
  .join("\n")}

TOP TRACKS:
${topTracks
  .slice(0, 5)
  .map(
    (t: any, i: number) =>
      `${i + 1}. "${t.name}" by ${t.artists.join(", ")} (Popularity: ${
        t.popularity
      }/100)`
  )
  .join("\n")}

LISTENING PATTERNS:
- ${signals.obsessionScore * 100}% of their life is dedicated to ${
      signals.topArtistName
    }
- Night owl listener: ${
      signals.nightOwl ? "Yes (emotionally unstable hours)" : "No"
    }
- Average popularity: ${signals.avgPopularity}/100
- Sad music addict: ${signals.sadBoi ? "Yes (mentally checked out)" : "No"}

––––––––––––––
OUTPUT RULES:
- Each roast: 1–2 sentences MAX.
- Each roast must reference something specific (artist, song, habit).
- Use emojis only if it adds insult (💀🤡😭).
- No generic jokes. Make it personal.
- Number each roast from 1 to 5.
- End each roast like you just dropped the mic and walked away.

Now roast them like they asked for it.
`;

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
      temperature: 0.9,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Roast API error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate roast" }), {
      status: 500,
    });
  }
}
