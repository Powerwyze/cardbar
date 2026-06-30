import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";

const BUILDER_STEPS = [
  { bar: "Choose Your Pour", desc: "Basic or Metal" },
  { bar: "Craft Your Label", desc: "Upload or AI design" },
  { bar: "Select Your Mix", desc: "Landing page template" },
  { bar: "Add Your Garnish", desc: "Automations" },
  { bar: "Preview the Pour", desc: "Test the flow" },
  { bar: "Start Your Tab", desc: "Checkout" },
];

export function BuilderPreview() {
  return (
    <Section>
      <SectionHeader
        label="The Experience"
        title="Build Your Card in Minutes"
        subtitle="A sleek multi-step builder with live preview — like ordering a custom drink at a luxury bar."
        centered
      />
      <GlassPanel className="p-6 md:p-8 max-w-4xl mx-auto" glow>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {BUILDER_STEPS.map((step, i) => (
            <div
              key={step.bar}
              className={`p-4 rounded-xl border transition-all ${
                i === 0
                  ? "border-bar-gold/50 bg-bar-burgundy/20"
                  : "border-bar-smoke/50 opacity-60"
              }`}
            >
              <p className="text-bar-amber text-xs mb-1">Step {i + 1}</p>
              <p className="text-bar-cream text-sm font-medium">{step.bar}</p>
              <p className="text-bar-cream/40 text-xs">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <GoldButton href="/build">Start Building</GoldButton>
        </div>
      </GlassPanel>
    </Section>
  );
}
