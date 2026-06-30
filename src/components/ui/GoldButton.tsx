"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function GoldButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
}: GoldButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full overflow-hidden amber-glow";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const variants = {
    primary:
      "bg-gradient-to-r from-bar-gold to-bar-amber text-bar-black hover:from-bar-amber hover:to-bar-gold",
    outline:
      "border border-bar-gold/50 text-bar-gold hover:bg-bar-gold/10 hover:border-bar-gold",
    ghost: "text-bar-cream hover:text-bar-gold hover:bg-white/5",
  };

  const classes = cn(base, sizes[size], variants[variant], className, disabled && "opacity-50 pointer-events-none");

  const inner = (
    <>
      <span className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity" />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {inner}
    </motion.button>
  );
}
