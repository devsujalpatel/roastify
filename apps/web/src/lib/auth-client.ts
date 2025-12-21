import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL, // VERY IMPORTANT
});

export const signInSpotify = async () => {
  await authClient.signIn.social({
    provider: "spotify",
  });
};

export const signInGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};

export const signInGithub = async () => {
  await authClient.signIn.social({
    provider: "github",
  });
};
