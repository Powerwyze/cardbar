import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className, id, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28 px-4 md:px-8",
        dark ? "bg-bar-charcoal" : "bar-shelf-bg",
        className
      )}
    >
      <div className="absolute inset-0 smoke-overlay pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ label, title, subtitle, centered }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center")}>
      {label && (
        <p className="text-bar-amber text-sm font-medium tracking-[0.2em] uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-5xl text-bar-cream leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-bar-cream/70 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
