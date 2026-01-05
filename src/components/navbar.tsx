"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Flame } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="fixed top-4 w-full z-50 flex justify-center px-4">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl rounded-full border border-white/10 bg-neutral-200/20 backdrop-blur-md shadow-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-black/30"
      >
        <div className="flex h-14 items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-red-600">
              <Flame className="h-4 w-4 text-white fill-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white drop-shadow">
              Roastify
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link href="/login">
              <Button
                variant="ghost"
                className="rounded-full text-base font-medium text-neutral-900 hover:bg-white/5 transition-colors"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="sm"
                className="rounded-full bg-white text-black font-semibold hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
              >
                Start Roasting
              </Button>
            </Link>
          </nav>
        </div>
      </motion.header>
    </div>
  );
};
