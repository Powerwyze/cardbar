import { Section } from "@/components/ui/Section";
import { GoldButton } from "@/components/ui/GoldButton";
import { SmokeEffect } from "@/components/ui/SmokeEffect";

export function FinalCTA() {
  return (
    <Section className="relative overflow-hidden">
      <SmokeEffect />
      <div className="text-center relative z-10 py-8">
        <p className="text-bar-amber text-sm tracking-[0.2em] uppercase mb-4">Last Call</p>
        <h2 className="font-serif text-4xl md:text-5xl text-bar-cream mb-6">
          Ready to Mix Your{" "}
          <span className="text-gradient-gold">Signature Card?</span>
        </h2>
        <p className="text-bar-cream/70 text-lg max-w-2xl mx-auto mb-8">
          Choose your card, upload your logo, pick your landing page, and tell the Cardologist
          what should happen after every tap.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <GoldButton href="/build" size="lg">
            Start My Card
          </GoldButton>
          <GoldButton href="/build" variant="outline" size="lg">
            Talk to the Cardologist
          </GoldButton>
        </div>
      </div>
    </Section>
  );
}
