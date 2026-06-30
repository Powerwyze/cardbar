"use client";

import { useBuilderStore } from "@/lib/builder/store";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { TapSimulator } from "@/components/simulator/TapSimulator";

export function StepSimulator() {
  const { selectedAutomations, nextStep, prevStep } = useBuilderStore();

  return (
    <GlassPanel className="p-6 md:p-8">
      <h2 className="font-serif text-2xl text-bar-cream mb-2">Preview the Pour</h2>
      <p className="text-bar-cream/60 text-sm mb-6">
        Test what happens when someone taps your card.
      </p>

      <TapSimulator compact automations={selectedAutomations.slice(0, 3)} />

      <div className="flex gap-3 mt-8">
        <GoldButton onClick={prevStep} variant="ghost" className="flex-1">Back</GoldButton>
        <GoldButton onClick={nextStep} className="flex-1">Continue — Start Your Tab</GoldButton>
      </div>
    </GlassPanel>
  );
}
