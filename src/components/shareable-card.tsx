"use client";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, Twitter, Copy, X, Flame, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ShareableCardProps {
  roast: string;
  onClose: () => void;
}

export const ShareableCard = ({ roast, onClose }: ShareableCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
        backgroundColor: "#000000",
      });
      const link = document.createElement("a");
      link.download = "roastify-card.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to generate image:", err);
      alert("Failed to download. Please try again or take a screenshot.");
    } finally {
      setDownloading(false);
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      `🔥 I just got roasted by @sujalpatelcoder project:\n\n"${roast}"\n\nGet your Spotify roasted at`
    );
    const url = encodeURIComponent("https://roastify.vibeit.tech");
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  const handleCopyForInstagram = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      // Convert data URL to blob
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy image:", err);
      // Fallback: copy text
      await navigator.clipboard.writeText(roast);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* The Card - This is what gets captured */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 p-1"
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>

              {/* Content */}
              <div className="relative space-y-4">
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-red-600">
                    <Flame className="h-4 w-4 text-white fill-white" />
                  </div>
                  <span className="text-lg font-bold text-white">Roastify</span>
                </div>

                {/* Roast Text */}
                <p className="text-xl font-medium text-white leading-relaxed">
                  &ldquo;{roast}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-white/50">roastify.vibeit.tech</span>
                  <span className="text-sm text-white/50">🔥 Get roasted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className={cn(
                "flex-1 gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20",
                "transition-all hover:scale-[1.02] active:scale-[0.98]"
              )}
              variant="outline"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Saving..." : "Download"}
            </Button>

            <Button
              onClick={handleTwitterShare}
              className={cn(
                "flex-1 gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white",
                "transition-all hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <Twitter className="h-4 w-4" />
              Tweet
            </Button>

            <Button
              onClick={handleCopyForInstagram}
              className={cn(
                "flex-1 gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
                "transition-all hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
