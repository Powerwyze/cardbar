"use client";

import { useBuilderStore } from "@/lib/builder/store";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { formatCurrency } from "@/lib/utils";
import { CARD_PRICES } from "@/types";
import { Check } from "lucide-react";

export function StepChoosePour() {
  const { cardType, setCardType, nextStep } = useBuilderStore();

  const options = [
    {
      type: "basic" as const,
      barName: "The Classic Pour",
      name: "Basic Card",
      price: CARD_PRICES.basic,
      desc: "Custom printed NFC card with full digital experience.",
      features: ["Printed NFC card", "Landing page", "Basic automations", "24hr ship"],
    },
    {
      type: "metal" as const,
      barName: "The Reserve Pour",
      name: "Metal Card",
      price: CARD_PRICES.metal,
      desc: "Premium metal NFC card for a lasting impression.",
      features: ["Metal NFC card", "Landing page", "Basic automations", "24hr ship"],
      popular: true,
    },
  ];

  return (
    <GlassPanel className="p-6 md:p-8">
      <h2 className="font-serif text-2xl text-bar-cream mb-2">Choose Your Pour</h2>
      <p className="text-bar-cream/60 text-sm mb-6">Select your card type to begin mixing.</p>

      <div className="space-y-4 mb-8">
        {options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => setCardType(opt.type)}
            className={`w-full text-left p-5 rounded-xl border transition-all ${
              cardType === opt.type
                ? "border-bar-gold bg-bar-burgundy/20 gold-glow"
                : "border-bar-smoke hover:border-bar-gold/30"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                {opt.popular && (
                  <span className="text-xs text-bar-amber uppercase tracking-wider">Most Popular</span>
                )}
                <p className="text-bar-amber/70 text-xs italic">{opt.barName}</p>
                <h3 className="font-serif text-xl text-bar-cream">{opt.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl text-gradient-gold">{formatCurrency(opt.price)}</span>
                {cardType === opt.type && <Check size={20} className="text-bar-gold" />}
              </div>
            </div>
            <p className="text-bar-cream/50 text-sm mb-3">{opt.desc}</p>
            <div className="flex flex-wrap gap-2">
              {opt.features.map((f) => (
                <span key={f} className="text-xs px-2 py-1 rounded-full bg-bar-charcoal text-bar-cream/60">
                  {f}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <GoldButton onClick={nextStep} disabled={!cardType} className="w-full">
        Continue — Craft Your Label
      </GoldButton>
    </GlassPanel>
  );
}
