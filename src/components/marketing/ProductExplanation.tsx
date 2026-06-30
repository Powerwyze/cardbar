import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Zap, Globe, Bot } from "lucide-react";

export function ProductExplanation() {
  return (
    <Section>
      <SectionHeader
        label="The Full Pour"
        title="Not Just a Card. A Full Digital Pour."
        subtitle="Every card comes with a custom landing page and automation setup, so every tap can save a contact, capture a lead, book a meeting, send a file, launch an AI agent, or trigger your next business workflow."
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Zap,
            title: "Physical NFC Card",
            desc: "Premium printed or metal card with embedded NFC chip. Tap to connect instantly.",
          },
          {
            icon: Globe,
            title: "Custom Landing Page",
            desc: "Branded digital destination with your links, forms, calendar, and content.",
          },
          {
            icon: Bot,
            title: "Smart Automations",
            desc: "CRM updates, follow-ups, bookings, and AI agents — built to order.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <GlassPanel key={title} className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-bar-burgundy/40 border border-bar-gold/20 flex items-center justify-center mx-auto mb-4">
              <Icon size={22} className="text-bar-gold" />
            </div>
            <h3 className="font-serif text-xl text-bar-cream mb-2">{title}</h3>
            <p className="text-bar-cream/60 text-sm leading-relaxed">{desc}</p>
          </GlassPanel>
        ))}
      </div>
    </Section>
  );
}
