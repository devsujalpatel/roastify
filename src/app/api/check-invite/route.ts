import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/config";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

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

    const userData = await db
      .select({ isInvited: user.isInvited })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!userData.length) {
      return NextResponse.json({ isInvited: false });
    }

    return NextResponse.json({ isInvited: userData[0].isInvited });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
