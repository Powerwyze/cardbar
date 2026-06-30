"use client";

import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/GoldButton";
import { NfcCardMockup } from "@/components/ui/NfcCardMockup";
import { SmokeEffect } from "@/components/ui/SmokeEffect";
import { Smartphone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <SmokeEffect />
      {/* Amber lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-bar-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bar-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-bar-amber text-sm font-medium tracking-[0.2em] uppercase mb-4">
            The Card Bar
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-bar-cream leading-tight mb-6">
            Your Business Card,{" "}
            <span className="text-gradient-gold">Served Smart.</span>
          </h1>
          <p className="text-bar-cream/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
            The Card Bar mixes custom NFC cards, branded landing pages, automations, and AI agents
            into one unforgettable tap.
          </p>
          <div className="flex flex-wrap gap-4">
            <GoldButton href="/build" size="lg">
              Start Mixing My Card
            </GoldButton>
            <GoldButton href="/#how-it-works" variant="outline" size="lg">
              See How It Works
            </GoldButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <TapDemo />
        </motion.div>
      </div>
    </section>
  );
}

function TapDemo() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <NfcCardMockup className="mx-auto" variant="metal" name="Alex Rivera" title="Founder & CEO" />

      {/* Phone mockup */}
      <motion.div
        className="absolute -right-4 top-8 w-36 h-64 rounded-3xl border-2 border-bar-smoke bg-bar-charcoal overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="h-6 bg-bar-black flex items-center justify-center">
          <div className="w-12 h-1 rounded-full bg-bar-smoke" />
        </div>
        <div className="p-3 space-y-2">
          <div className="w-10 h-10 rounded-full bg-bar-gold/20 border border-bar-gold/40 mx-auto" />
          <div className="h-2 bg-bar-gold/30 rounded w-3/4 mx-auto" />
          <div className="h-1.5 bg-bar-smoke rounded w-1/2 mx-auto" />
          <div className="space-y-1.5 mt-3">
            {["Save Contact", "Book Meeting", "View Portfolio"].map((btn) => (
              <div key={btn} className="h-6 rounded-lg bg-bar-burgundy/40 border border-bar-gold/20 flex items-center justify-center">
                <span className="text-[8px] text-bar-cream/70">{btn}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tap animation line */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.8, duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <Smartphone size={16} className="text-bar-amber" />
        <div className="w-16 h-px bg-gradient-to-r from-bar-amber to-transparent" />
      </motion.div>
    </div>
  );
}
