import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  id?: string;
}

export function GlassPanel({ children, className, glow, id }: GlassPanelProps) {
  return (
    <div id={id} className={cn("glass-panel rounded-2xl", glow && "gold-glow", className)}>
      {children}
    </div>
  );
}
