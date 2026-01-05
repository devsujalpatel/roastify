"use client";

import { RoastComponent } from "@/components/roast-comp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { authClient, linkSocial, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Flame,
  LogOut,
  Music,
  CheckCircle2,
  Loader2,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Client = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [spotifyConnected, setSpotifyConnected] = useState<boolean | null>(
    null
  );
  const [isInvited, setIsInvited] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Check invite status
        const inviteRes = await fetch("/api/check-invite");
        if (inviteRes.ok) {
          const inviteData: { isInvited: boolean } = await inviteRes.json();
          setIsInvited(inviteData.isInvited);
        } else {
          setIsInvited(false);
        }

        // Check Spotify connection
        const spotifyRes = await fetch("/api/spotify/check-connection");
        if (spotifyRes.ok) {
          const spotifyData: { connected: boolean } = await spotifyRes.json();
          setSpotifyConnected(spotifyData.connected);
        } else {
          setSpotifyConnected(false);
        }
      } catch (error) {
        console.error("Error checking status:", error);
        setIsInvited(false);
        setSpotifyConnected(false);
      }
    };

    checkStatus();
  }, []);

  const handleSignOut = async () => {
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

  const user = session?.user;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-red-600">
            <Flame className="h-5 w-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Roastify</span>
        </Link>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-border"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-2 ring-border">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-none">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Sign out</span>
          </Button>
        </div>
      </motion.header>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          {isInvited
            ? "Connect your Spotify to get roasted."
            : "Request access to get started."}
        </p>
      </motion.div>

      {/* Loading State */}
      {isInvited === null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
            <CardContent className="py-8 flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Checking access...</span>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Not Invited - Request Access Card */}
      {isInvited === false && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Flame className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Request Access</CardTitle>
                  <CardDescription>
                    This platform is invite-only
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To use Roastify, you need an invite. DM me on Twitter to get
                access!
              </p>
              <a
                href="https://twitter.com/sujalpatelcoder"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
                  "bg-blue-500 hover:bg-blue-600 text-white transition-all",
                  "hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"
                  />
                </svg>
                DM @sujalpatelcoder
              </a>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Invited - Spotify Connection Card */}
      {isInvited && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1DB954]/10">
                  <Music className="h-5 w-5 text-[#1DB954]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Spotify Connection</CardTitle>
                  <CardDescription>
                    {spotifyConnected === null
                      ? "Checking connection..."
                      : spotifyConnected
                      ? "Your account is connected"
                      : "Connect to analyze your music"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {spotifyConnected === null ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Checking...</span>
                </div>
              ) : spotifyConnected === false ? (
                <Button
                  className={cn(
                    "gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-white transition-all",
                    "hover:scale-[1.02] active:scale-[0.98]"
                  )}
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
                      fill="currentColor"
                      d="M12.001 2c-5.5 0-10 4.5-10 10s4.5 10 10 10s10-4.5 10-10s-4.45-10-10-10m3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85c-.2.3-.55.4-.85.2m1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1s-.7.5-1.05.25M6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75"
                    />
                  </svg>
                  Connect Spotify Account
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-[#1DB954] font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  Connected to Spotify
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Roast Section - Only for invited users with Spotify connected */}
      {isInvited && spotifyConnected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <RoastComponent />
        </motion.div>
      )}
    </div>
  );
};
