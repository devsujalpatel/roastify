"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, BarChart3, Share2, Zap } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground/10 selection:text-foreground">
      <Navbar />

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-32 sm:pt-40 sm:pb-40">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
              v1.0 is now live
            </div>

            <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-foreground max-w-3xl">
              Your Spotify taste, <br />
              <span className="text-muted-foreground">brutally analyzed.</span>
            </h1>

            <p className="max-w-[600px] text-muted-foreground text-lg sm:text-xl leading-relaxed">
              We use advanced AI to roast your music history. Discover what your
              listening habits actually say about you.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base rounded-full shadow-lg"
                >
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
                  className="h-12 px-8 text-base rounded-full border-input bg-background hover:bg-muted"
                >
                  View Source
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features / Bento Grid */}
        <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 border-t bg-muted/30">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
              Why let us roast you?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn&apos;t just look at usage; it understands the soul of
              your playlists.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-xl font-medium tracking-tight">
                Ruthless AI
              </h3>
              <p className="text-muted-foreground">
                Our model doesn&apos;t hold back. It finds your guilty pleasures
                and puts them front and center.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-xl font-medium tracking-tight">
                Deep Analytics
              </h3>
              <p className="text-muted-foreground">
                Beyond the roast, get actual insights into genres, eras, and
                obscure artists you love.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Share2 className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-xl font-medium tracking-tight">
                Shareable Cards
              </h3>
              <p className="text-muted-foreground">
                Generate beautiful (and embarrassing) scorecards to share on
                Twitter and Instagram.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t py-12 text-center text-sm text-muted-foreground">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p>
              © {new Date().getFullYear()} Roastify. Built for music lovers.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="https://github.com/devsujalpatel"
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
