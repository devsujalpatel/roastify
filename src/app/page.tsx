"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Share2,
  Zap,
  Sparkles,
  Music,
  Flame,
} from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/20 selection:text-foreground overflow-hidden">
      <Navbar />

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-40 sm:pt-44 sm:pb-48">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/30 via-red-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-l from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-orange-500/10 via-transparent to-transparent rounded-full blur-3xl" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 flex flex-col items-center text-center max-w-5xl mx-auto space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-orange-400"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-Powered Music Roasting</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-800 bg-clip-text text-transparent">
                Get your taste
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 bg-clip-text text-transparent">
                brutally roasted.
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-[600px] text-muted-foreground text-lg sm:text-xl leading-relaxed"
            >
              Connect your Spotify. Let our AI analyze your listening history.
              Prepare for the most savage (and accurate) roasts about your music
              taste.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30"
                >
                  <Flame className="mr-2 h-5 w-5" />
                  Start Roasting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://github.com/devsujalpatel/roastify"
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base rounded-full border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  View on GitHub
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-8 pt-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>100% Free</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="hidden sm:flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span>Spotify Connected</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="hidden sm:flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Instant Results</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features / Bento Grid */}
        <section className="w-full px-4 py-24 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
                Why get{" "}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  roasted
                </span>
                ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI doesn&apos;t just look at usage—it understands the soul
                of your playlists.
              </p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Feature 1 - Large */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent p-8 backdrop-blur-sm lg:col-span-2"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30">
                    <Zap className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold tracking-tight">
                    Ruthless AI Analysis
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-md">
                    Our model doesn&apos;t hold back. It finds your guilty
                    pleasures, analyzes your late-night listening habits, and
                    puts them front and center.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent p-8 backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30">
                    <BarChart3 className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">
                    Deep Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Beyond the roast—get actual insights into your genres, eras,
                    and obscure artists.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent p-8 backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30">
                    <Share2 className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">
                    Shareable Cards
                  </h3>
                  <p className="text-muted-foreground">
                    Generate beautiful (and embarrassing) scorecards to share on
                    Twitter and Instagram.
                  </p>
                </div>
              </motion.div>

              {/* Feature 4 - Wide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 via-transparent to-transparent p-8 backdrop-blur-sm lg:col-span-2"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30">
                      <Music className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold tracking-tight">
                      Powered by Spotify
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-md">
                      We securely connect to your Spotify to analyze your top
                      tracks, artists, and recently played songs. Your data
                      stays private.
                    </p>
                  </div>
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="h-12 px-6 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-white shadow-lg transition-all hover:scale-105"
                    >
                      Connect Spotify
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-4xl text-center"
          >
            <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-purple-500/10 p-12 md:p-16 backdrop-blur-sm">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-500/20 to-transparent rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                  Ready to face the{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    truth
                  </span>
                  ?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                  Your music taste says more about you than you think.
                  Let&apos;s find out what that is.
                </p>
                <Link href="/login">
                  <Button
                    size="lg"
                    className="h-14 px-10 text-lg rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
                  >
                    Get Roasted Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-white/10 py-12 text-center text-sm text-muted-foreground">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-red-600">
                <Flame className="h-4 w-4 text-white fill-white" />
              </div>
              <span className="font-semibold text-foreground">Roastify</span>
            </div>
            <p>
              © {new Date().getFullYear()} Roastify. Built for music lovers who
              can take a joke.
            </p>
            <div className="flex gap-6">
              <Link
                href="https://twitter.com/sujalpatelcoder"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="https://github.com/devsujalpatel/roastify"
                target="_blank"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
