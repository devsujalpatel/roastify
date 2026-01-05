"use client";
import SignIn from "@/components/sign-in-form";
import { motion } from "motion/react";
import Link from "next/link";
import { Flame } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-8"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-red-600 transition-transform group-hover:scale-110">
            <Flame className="h-5 w-5 text-white fill-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Roastify</span>
        </Link>

        {/* Sign In Form */}
        <SignIn />

        {/* Invite Only Notice */}
        <div className="text-center space-y-2 max-w-sm">
          <p className="text-sm text-muted-foreground">
            🔒 This platform is{" "}
            <span className="font-semibold text-foreground">invite-only</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            DM me on Twitter for access:{" "}
            <a
              href="https://twitter.com/sujalpatelcoder"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-500 hover:text-blue-400 transition-colors"
            >
              @sujalpatelcoder
            </a>
          </p>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>
      </motion.div>
    </div>
  );
};

export default LoginPage;
