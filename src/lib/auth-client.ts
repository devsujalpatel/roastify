import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;

export const socialSignIn = async (method: "google" | "github" | "spotify") => {
  return await signIn.social({
    provider: method,
    callbackURL: "/dashboard",
  });
};
