"use client";

import { useBuilderStore } from "@/lib/builder/store";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { AUTOMATION_OPTIONS } from "@/types";
import { Check } from "lucide-react";

const EXAMPLES = [
  "When someone taps my card, send them my Calendly and text me their name.",
  "Add new leads to HubSpot and send a thank-you email.",
  "Show my restaurant menu and collect SMS subscribers.",
  "Let visitors ask an AI about my services before booking.",
];

export function StepAutomations() {
  const {
    selectedAutomations,
    toggleAutomation,
    customAutomation,
    setCustomAutomation,
    nextStep,
    prevStep,
  } = useBuilderStore();

  return (
    <GlassPanel className="p-6 md:p-8">
      <h2 className="font-serif text-2xl text-bar-cream mb-2">Add Your Garnish</h2>
      <p className="text-bar-cream/60 text-sm mb-6">
        Tell us what should happen after every tap. Select options or describe a custom automation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 max-h-64 overflow-y-auto">
        {AUTOMATION_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => toggleAutomation(option)}
            className={`flex items-center gap-2 p-3 rounded-lg border text-left text-sm transition-all ${
              selectedAutomations.includes(option)
                ? "border-bar-gold bg-bar-gold/10 text-bar-cream"
                : "border-bar-smoke text-bar-cream/60 hover:border-bar-gold/30"
            }`}
          >
            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
              selectedAutomations.includes(option) ? "bg-bar-gold border-bar-gold" : "border-bar-smoke"
            }`}>
              {selectedAutomations.includes(option) && <Check size={10} className="text-bar-black" />}
            </div>
            {option}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label className="text-bar-cream/50 text-xs uppercase tracking-wider">
          Custom Automation
        </label>
        <textarea
          value={customAutomation}
          onChange={(e) => setCustomAutomation(e.target.value)}
          placeholder="Drop a link, tool, workflow, or idea and we'll build it to order."
          rows={3}
          className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2.5 text-sm text-bar-cream placeholder:text-bar-cream/20 focus:outline-none focus:border-bar-gold/50 resize-none"
        />
      </div>

      <div className="mb-6">
        <p className="text-bar-cream/40 text-xs mb-2">Examples:</p>
        <div className="space-y-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setCustomAutomation(ex)}
              className="block w-full text-left text-xs text-bar-cream/50 hover:text-bar-amber p-2 rounded-lg hover:bg-bar-burgundy/10 transition-colors"
            >
              &ldquo;{ex}&rdquo;
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <GoldButton onClick={prevStep} variant="ghost" className="flex-1">Back</GoldButton>
        <GoldButton onClick={nextStep} className="flex-1">Continue — Preview the Pour</GoldButton>
      </div>
    </GlassPanel>
  );
}
