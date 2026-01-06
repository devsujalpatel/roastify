"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Loader2, Sparkles, RefreshCw, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCompletion } from "@ai-sdk/react";
import { ShareableCard } from "@/components/shareable-card";

export const RoastComponent = () => {
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedRoast, setSelectedRoast] = useState<string | null>(null);

  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/roast",
    streamProtocol: "text",
    onFinish: () => {
      setHasGenerated(true);
    },
    onError: (err) => {
      console.error("Roast error:", err);
    },
  });

  const handleGenerateRoast = async () => {
    setHasGenerated(false);
    await complete("");
  };

  // Parse the roasts from the completion
  const roasts = completion
    .split("\n")
    .filter((line) => line.trim().match(/^\d+\./))
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter((roast) => roast.length > 0);

  return (
    <>
      <Card className="border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-tr from-orange-500/20 to-red-500/20">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Roast Generator</CardTitle>
              <CardDescription>
                Powered by Groq AI • Based on your Spotify data
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGenerateRoast}
            disabled={isLoading}
            className={cn(
              "gap-2 bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white transition-all",
              "hover:scale-[1.02] active:scale-[0.98] shadow-lg",
              isLoading && "opacity-70"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing your shame...
              </>
            ) : hasGenerated ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Roast Me Again
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate AI Roast
              </>
            )}
          </Button>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              Failed to generate roast. Please try again.
            </div>
          )}

          <AnimatePresence mode="wait">
            {isLoading && !completion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4"
              >
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-orange-500" />
                </div>
                <span className="text-sm text-muted-foreground">
                  AI is judging your music taste...
                </span>
              </motion.div>
            )}

            {(completion || roasts.length > 0) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-2"
              >
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Flame className="h-3 w-3" />
                  Your Roasts
                </h4>

                {roasts.length > 0 ? (
                  roasts.map((roast, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl border bg-muted/30 p-4"
                    >
                      <div className="absolute top-0 left-0 h-full w-1 bg-linear-to-b from-orange-500 to-red-600" />
                      <div className="flex items-start justify-between gap-3">
                        <p className="pl-3 text-sm md:text-base lg:text-lg leading-relaxed flex-1">
                          {roast}
                        </p>
                        <button
                          onClick={() => setSelectedRoast(roast)}
                          className="shrink-0 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                          title="Share this roast"
                        >
                          <Share2 className="h-4 w-4 text-muted-foreground hover:text-orange-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : isLoading && completion ? (
                  <div className="relative overflow-hidden rounded-xl border bg-muted/30 p-4">
                    <div className="absolute top-0 left-0 h-full w-1 bg-linear-to-b from-orange-500 to-red-600 animate-pulse" />
                    <p className="pl-3 text-sm leading-relaxed whitespace-pre-wrap">
                      {completion}
                      <span className="inline-block w-2 h-4 bg-orange-500 animate-pulse ml-1" />
                    </p>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Shareable Card Modal */}
      {selectedRoast && (
        <ShareableCard
          roast={selectedRoast}
          onClose={() => setSelectedRoast(null)}
        />
      )}
    </>
  );
};
