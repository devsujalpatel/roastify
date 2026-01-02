"use client";

import { RoastComponent } from "@/components/roast-comp";
import { Button } from "@/components/ui/button";
import { authClient, linkSocial, signIn, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Client = () => {
  const trpc = useTRPC();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkSpotifyConnection = async () => {
      try {
        const res = await fetch("/api/spotify/check-connection");

        if (!res.ok) {
          throw new Error("Request failed");
        }

        const data: { connected: boolean } = await res.json();

        if (data.connected) {
          setSpotifyConnected(true);
        } else {
          setSpotifyConnected(false);
        }
      } catch (error) {
        console.error("Error checking Spotify connection:", error);
        toast.error("Failed to check Spotify connection");
      }
    };

    checkSpotifyConnection();
  }, []);

  const handleClick = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const { data: users } = useSuspenseQuery(trpc.getUser.queryOptions());

  const [loading, setLoading] = useState(false);
  const [spotifyConnected, setSpotifyConnected] = useState(false);

  const handleClickSpotify = async () => {
    setLoading(true);

    if (!session) {
      router.push("/login");
      return;
    }
    linkSocial({
      provider: "spotify",
      callbackURL: "/dashboard",
      fetchOptions: {
        onError: (error) => {
          console.error("Error linking Spotify account:", error);
          setLoading(false);
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <Button onClick={handleClick}>Sign Out</Button>
      {users.map((u) => (
        <div key={u.id}>
          <h1 key={u.id}>Welcome, {u.name}!</h1>
        </div>
      ))}

      {!spotifyConnected && (
        <Button
          variant="outline"
          className={cn("w-full gap-2 cursor-pointer")}
          disabled={loading}
          onClick={handleClickSpotify}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#1DB954"
              d="M12.001 2c-5.5 0-10 4.5-10 10s4.5 10 10 10s10-4.5 10-10s-4.45-10-10-10m3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85c-.2.3-.55.4-.85.2m1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1s-.7.5-1.05.25M6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75"
            ></path>
          </svg>
          Connect Spotify Account
        </Button>
      )}

      {spotifyConnected && <RoastComponent />}
    </div>
  );
};
