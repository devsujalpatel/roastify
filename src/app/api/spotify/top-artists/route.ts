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
      "https://api.spotify.com/v1/me/top/artists?limit=20&time_range=medium_term",
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
      items: data.items.map((artist: any, index: number) => ({
        rank: index + 1,
        id: artist.id,
        name: artist.name,
        genres: artist.genres,
        popularity: artist.popularity,
        followers: artist.followers?.total,
        image: artist.images?.[0]?.url,
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
