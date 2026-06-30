import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";

const testimonials = [
  {
    quote: "My metal card gets compliments at every networking event. The landing page books meetings while I sleep.",
    name: "Sarah Chen",
    title: "Founder, Luxe Consulting",
  },
  {
    quote: "The Cardologist helped me set up lead capture in minutes. 24-hour turnaround was unreal.",
    name: "Marcus Williams",
    title: "Real Estate Agent",
  },
  {
    quote: "Our restaurant cards handle reservations and menu questions. The AI add-on pays for itself.",
    name: "Elena Rodriguez",
    title: "Owner, The Velvet Room",
  },
];

export function Testimonials() {
  return (
    <Section>
      <SectionHeader label="Reviews" title="What Our Patrons Say" centered />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <GlassPanel key={t.name} className="p-6">
            <p className="text-bar-cream/80 text-sm leading-relaxed mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="border-t border-bar-gold/10 pt-4">
              <p className="text-bar-cream font-medium text-sm">{t.name}</p>
              <p className="text-bar-cream/40 text-xs">{t.title}</p>
            </div>
          </GlassPanel>
        ))}
      </div>
    </Section>
  );
}
