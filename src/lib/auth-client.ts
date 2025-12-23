import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { signOut, useSession } = authClient;

export const signInWithGithub = async () => {
  const data = await authClient.signIn.social({
    provider: "github",
  });
};
export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};
export const signInWithSpotify = async () => {
  const data = await authClient.signIn.social({
    provider: "spotify",
  });
};
