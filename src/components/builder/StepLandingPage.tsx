"use client";

import { useBuilderStore } from "@/lib/builder/store";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { TEMPLATES } from "@/lib/templates";
import { Check } from "lucide-react";

export function StepLandingPage() {
  const { selectedTemplate, setSelectedTemplate, nextStep, prevStep } = useBuilderStore();

  return (
    <GlassPanel className="p-6 md:p-8">
      <h2 className="font-serif text-2xl text-bar-cream mb-2">Select Your Landing Page Mix</h2>
      <p className="text-bar-cream/60 text-sm mb-6">
        Choose the template that best fits your business.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-h-[60vh] overflow-y-auto pr-1">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selectedTemplate === template.id
                ? "border-bar-gold bg-bar-burgundy/20"
                : "border-bar-smoke hover:border-bar-gold/30"
            }`}
          >
            <div
              className="h-20 rounded-lg mb-3 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${template.accentColor}22, #1A1A1D)`,
                border: `1px solid ${template.accentColor}33`,
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
                <div className="w-6 h-6 rounded-full border opacity-40" style={{ borderColor: template.accentColor }} />
                <div className="w-12 h-1.5 rounded opacity-30" style={{ background: template.accentColor }} />
                <div className="flex gap-1">
                  {[1, 2].map((n) => (
                    <div key={n} className="w-6 h-3 rounded opacity-20" style={{ background: template.accentColor }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-bar-amber/70 text-xs italic">{template.barName}</p>
                <h3 className="text-bar-cream text-sm font-medium">{template.name}</h3>
                <p className="text-bar-cream/40 text-xs mt-1">{template.bestFor}</p>
              </div>
              {selectedTemplate === template.id && <Check size={16} className="text-bar-gold shrink-0" />}
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <GoldButton onClick={prevStep} variant="ghost" className="flex-1">Back</GoldButton>
        <GoldButton onClick={nextStep} disabled={!selectedTemplate} className="flex-1">
          Continue — Add Your Garnish
        </GoldButton>
      </div>
    </GlassPanel>
  );
}
