import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";

const steps = [
  {
    step: "01",
    barName: "Choose Your Pour",
    title: "Pick Your Card",
    desc: "Select a Basic printed card ($30) or premium Metal card ($50). Both include your custom landing page and automations.",
  },
  {
    step: "02",
    barName: "Craft Your Label",
    title: "Design & Configure",
    desc: "Upload your logo, choose a landing page template, and tell us what should happen after every tap.",
  },
  {
    step: "03",
    barName: "Start Your Tab",
    title: "We Build & Ship",
    desc: "Our team builds your landing page, connects your automations, and ships your card within 24 hours.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" dark>
      <SectionHeader
        label="Three Steps"
        title="How It Works"
        subtitle="Ordering your signature card is as smooth as ordering at an upscale bar."
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <GlassPanel key={s.step} className="p-8 relative">
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-px bg-bar-gold/30" />
            )}
            <p className="text-bar-amber text-xs tracking-widest uppercase mb-2">{s.barName}</p>
            <div className="font-serif text-5xl text-bar-gold/20 mb-4">{s.step}</div>
            <h3 className="font-serif text-2xl text-bar-cream mb-3">{s.title}</h3>
            <p className="text-bar-cream/60 text-sm leading-relaxed">{s.desc}</p>
          </GlassPanel>
        ))}
      </div>
    </Section>
  );
}
