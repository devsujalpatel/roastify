import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const sessionData = await auth.api.getSession({
      headers: {
        cookie: (await headers()).get("cookie") ?? "",
      },
    });

    if (!sessionData) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = sessionData.user.id;

    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: "spotify",
        userId,
      },
    });

    if (!accessToken) {
      return NextResponse.json(
        { error: "Connect your Spotify account" },
        { status: 401 }
      );
    }

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=50",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Spotify API failed", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: data.items.map((item: any) => ({
        track: {
          name: item.track.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          artists: item.track.artists.map((a: any) => ({ name: a.name })),
          popularity: item.track.popularity,
        },
        played_at: item.played_at,
      })),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
