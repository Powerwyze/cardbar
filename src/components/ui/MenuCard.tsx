import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "./GlassPanel";

interface MenuCardProps {
  name: string;
  barName?: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  children?: ReactNode;
  className?: string;
}

export function MenuCard({
  name,
  barName,
  price,
  period,
  description,
  features,
  highlighted,
  badge,
  children,
  className,
}: MenuCardProps) {
  return (
    <GlassPanel
      className={cn(
        "p-6 md:p-8 flex flex-col h-full transition-all duration-300",
        highlighted && "border-bar-gold/50 gold-glow scale-[1.02]",
        className
      )}
      glow={highlighted}
    >
      {badge && (
        <span className="inline-block self-start text-xs font-medium tracking-wider uppercase bg-bar-burgundy text-bar-amber px-3 py-1 rounded-full mb-4">
          {badge}
        </span>
      )}
      {barName && (
        <p className="text-bar-amber/80 text-sm italic mb-1">{barName}</p>
      )}
      <h3 className="font-serif text-2xl text-bar-cream mb-2">{name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="font-serif text-4xl text-gradient-gold">{price}</span>
        {period && <span className="text-bar-cream/50 text-sm">{period}</span>}
      </div>
      <p className="text-bar-cream/60 text-sm mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-2 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-bar-cream/80">
            <span className="text-bar-gold mt-0.5">◆</span>
            {f}
          </li>
        ))}
      </ul>
      {children}
    </GlassPanel>
  );
}
