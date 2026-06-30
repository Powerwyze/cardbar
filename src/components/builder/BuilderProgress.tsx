"use client";

import { motion } from "framer-motion";

interface BuilderProgressProps {
  steps: { num: number; bar: string }[];
  currentStep: number;
}

export function BuilderProgress({ steps, currentStep }: BuilderProgressProps) {
  return (
    <div className="flex items-center gap-1 mt-6">
      {steps.map((s) => (
        <div key={s.num} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className={`h-1.5 w-full rounded-full ${
              s.num <= currentStep ? "bg-bar-gold" : "bg-bar-smoke"
            }`}
            animate={s.num === currentStep ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: s.num === currentStep ? Infinity : 0, duration: 1.5 }}
          />
          <span className="text-[10px] text-bar-cream/30 hidden md:block truncate w-full text-center">
            {s.bar}
          </span>
        </div>
      ))}
    </div>
  );
}
