import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { buildSignals } from "@/lib/spotify-roast-engine/spotify-signals";
import { db } from "@/config";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topTracks = tracksData.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      artists: track.artists.map((a: any) => a.name),
      popularity: track.popularity,
      durationMs: track.duration_ms,
      previewUrl: track.preview_url,
      album: {
        name: track.album.name,
        image: track.album.images?.[0]?.url,
      },
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topArtists = artistsData.items.map((artist: any, index: number) => ({
      rank: index + 1,
      id: artist.id,
      name: artist.name,
      genres: artist.genres,
      popularity: artist.popularity,
      followers: artist.followers?.total ?? 0,
      image: artist.images?.[0]?.url,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recentlyPlayed = recentData.items.map((item: any) => ({
      track: item.track.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      artists: item.track.artists.map((a: any) => a.name),
      playedAt: item.played_at,
      hour: new Date(item.played_at).getHours(),
      popularity: item.track.popularity,
    }));

    // Build signals for context
    const signals = buildSignals({ topTracks, topArtists, recentlyPlayed });

    // Create a rich prompt for the AI
    const prompt = `You are a brutally honest, witty music critic who roasts people's Spotify listening habits in a hilarious but not mean-spirited way. You speak in a casual, Gen-Z friendly tone mixing English with occasional Hindi slang.

Based on this person's Spotify data, generate 3-5 savage but funny roasts:

**Top Artists:**
${topArtists
  .slice(0, 5)
  .map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (a: any, i: number) =>
      `${i + 1}. ${a.name} (${a.genres.slice(0, 3).join(", ")})`
  )
  .join("\n")}

**Top Tracks:**
${topTracks
  .slice(0, 5)
  .map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (t: any, i: number) =>
      `${i + 1}. "${t.name}" by ${t.artists.join(", ")} (Popularity: ${
        t.popularity
      }/100)`
  )
  .join("\n")}

**Listening Patterns:**
- Top artist obsession score: ${(signals.obsessionScore * 100).toFixed(
      0
    )}% of their music is ${signals.topArtistName}
- Night owl listener: ${signals.nightOwl ? "Yes, listens at 2-4 AM" : "No"}
- Average track popularity: ${signals.avgPopularity.toFixed(0)}/100
- Sad music enjoyer: ${signals.sadBoi ? "Yes" : "No"}

Generate roasts that:
1. Reference specific artists/songs they listen to
2. Call out their listening patterns (night owl, mainstream/underground, etc.)
3. Are funny and relatable
4. Use emojis sparingly but effectively
5. Each roast should be 1-2 sentences max

Format: Return each roast on a new line, numbered 1-5. Be creative and savage!`;

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
