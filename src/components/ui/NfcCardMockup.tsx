"use client";

import { motion } from "framer-motion";

interface NfcCardMockupProps {
  className?: string;
  name?: string;
  title?: string;
  variant?: "basic" | "metal";
}

export function NfcCardMockup({
  className,
  name = "Your Name",
  title = "Your Title",
  variant = "metal",
}: NfcCardMockupProps) {
  const isMetal = variant === "metal";

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* NFC pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full rounded-2xl border border-bar-amber/30 animate-pulse-ring absolute" />
        <div className="w-full h-full rounded-2xl border border-bar-amber/20 animate-pulse-ring absolute" style={{ animationDelay: "0.5s" }} />
      </div>

      <motion.div
        className="relative w-64 h-40 rounded-2xl overflow-hidden animate-float"
        style={{
          background: isMetal
            ? "linear-gradient(135deg, #2a2a2e 0%, #1a1a1d 50%, #3d3d42 100%)"
            : "linear-gradient(135deg, #1a1a1d 0%, #2c1810 100%)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,169,98,0.3)",
        }}
        whileHover={{ rotateY: 5, rotateX: -5 }}
      >
        {/* Gold trim */}
        <div className="absolute inset-0 border border-bar-gold/30 rounded-2xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bar-gold/60 to-transparent" />

        {/* NFC icon */}
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full border border-bar-amber/50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-bar-amber/60 animate-nfc-pulse" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <div className="w-8 h-8 rounded-full bg-bar-gold/20 border border-bar-gold/40 mb-2" />
          <p className="font-serif text-bar-cream text-sm font-medium">{name}</p>
          <p className="text-bar-cream/50 text-xs">{title}</p>
        </div>

        {/* Shimmer */}
        <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
      </motion.div>
    </div>
  );
}
