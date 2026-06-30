"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { GoldButton } from "@/components/ui/GoldButton";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Menu" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/build", label: "Build Your Card" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-bar-gold/10 bg-bar-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bar-gold to-bar-amber flex items-center justify-center">
            <span className="text-bar-black font-serif font-bold text-sm">CB</span>
          </div>
          <span className="font-serif text-bar-cream text-lg group-hover:text-bar-gold transition-colors">
            The Card Bar
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-bar-cream/70 hover:text-bar-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm text-bar-cream/70 hover:text-bar-gold transition-colors">
            Sign In
          </Link>
          <GoldButton href="/build" size="sm">
            Start Mixing My Card
          </GoldButton>
        </div>

        <button
          className="md:hidden text-bar-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-bar-gold/10 bg-bar-black/95"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-bar-cream/80 hover:text-bar-gold py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <GoldButton href="/build" size="sm" className="w-full">
                Start Mixing My Card
              </GoldButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
