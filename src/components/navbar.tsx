"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Flame, Github } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="fixed top-4 w-full z-50 flex justify-center px-4">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg shadow-black/20"
      >
        <div className="flex h-14 items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-red-600 shadow-lg shadow-orange-500/30">
              <Flame className="h-4 w-4 text-white fill-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Roastify
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {/* GitHub Link */}
            <Link
              href="https://github.com/devsujalpatel/roastify"
              target="_blank"
              className="hidden sm:flex"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <Github className="h-5 w-5" />
              </Button>
            </Link>

            {/* Sign In */}
            <Link href="/login">
              <Button
                variant="ghost"
                className="rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                Sign In
              </Button>
            </Link>

            {/* CTA Button */}
            <Link href="/dashboard">
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 px-5"
              >
                Get Roasted
              </Button>
            </Link>
          </nav>
        </div>
      </motion.header>
    </div>
  );
};
