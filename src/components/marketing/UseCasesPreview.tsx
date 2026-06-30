import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import Link from "next/link";

const useCases = [
  { title: "AI Voice Agent Card", desc: "Visitors talk to an AI that qualifies leads and answers questions.", href: "/use-cases#voice" },
  { title: "AI Calendar Agent", desc: "Smart scheduling assistant books meetings on the spot.", href: "/use-cases#calendar" },
  { title: "AI Sales Assistant", desc: "Qualifies prospects by budget, timeline, and need.", href: "/use-cases#sales" },
  { title: "AI Real Estate Agent", desc: "Captures buyer/seller leads and books showings.", href: "/use-cases#realestate" },
  { title: "AI Restaurant Host", desc: "Menu, reservations, events, and happy hour info.", href: "/use-cases#restaurant" },
  { title: "AI Event Networker", desc: "Personalized follow-up after conferences and trade shows.", href: "/use-cases#events" },
];

export function UseCasesPreview() {
  return (
    <Section dark>
      <SectionHeader
        label="Possibilities"
        title="What Your Card Can Do"
        subtitle="From lead capture to AI booking — every tap opens a world of possibilities."
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((uc) => (
          <Link key={uc.title} href={uc.href}>
            <GlassPanel className="p-6 h-full hover:border-bar-gold/40 transition-all amber-glow cursor-pointer">
              <h3 className="font-serif text-lg text-bar-cream mb-2">{uc.title}</h3>
              <p className="text-bar-cream/60 text-sm">{uc.desc}</p>
            </GlassPanel>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <GoldButton href="/use-cases" variant="outline">
          Explore All Use Cases
        </GoldButton>
      </div>
    </Section>
  );
}
