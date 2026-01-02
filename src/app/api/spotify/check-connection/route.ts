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
      return NextResponse.json(
        { connected: false, reason: "not_authenticated" },
        { status: 401 }
      );
    }

    const userId = sessionData.user.id;

    try {
      await auth.api.getAccessToken({
        body: {
          providerId: "spotify",
          userId,
        },
      });

      // If we reached here → Spotify connected
      return NextResponse.json({ connected: true }, { status: 200 });
    } catch {
      // No Spotify account linked
      return NextResponse.json({ connected: false }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
