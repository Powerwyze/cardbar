import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { CardologistAvatar } from "@/components/cardologist/CardologistAvatar";
import { Bot, MessageCircle, Calendar, Users } from "lucide-react";

export function AIAddonSection() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeader
            label="The AI Reserve"
            title="Add the Cardologist to Your Card"
            subtitle="For $10/month, your NFC card can include an AI assistant that answers questions, books meetings, captures leads, recommends services, and helps visitors take the next step even when you are busy."
          />
          <div className="space-y-4 mb-8">
            {[
              { icon: MessageCircle, text: "AI chat & voice agent on your landing page" },
              { icon: Users, text: "Automatic lead capture and qualification" },
              { icon: Calendar, text: "Smart appointment scheduling" },
              { icon: Bot, text: "24/7 FAQ and business assistant" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-bar-burgundy/40 flex items-center justify-center">
                  <Icon size={16} className="text-bar-gold" />
                </div>
                <p className="text-bar-cream/80 text-sm">{text}</p>
              </div>
            ))}
          </div>
          <GoldButton href="/build">Add AI to My Card</GoldButton>
        </div>

        <GlassPanel className="p-6" glow>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-bar-gold/10">
            <CardologistAvatar size={40} />
            <div>
              <p className="text-bar-cream font-medium text-sm">The Cardologist</p>
              <p className="text-bar-cream/40 text-xs">AI Concierge · Online</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-bar-burgundy/20 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
              <p className="text-bar-cream/90 text-sm">
                Welcome! I can help visitors learn about your services, book appointments, and
                capture leads — even when you&apos;re busy. Would you like that served with AI?
              </p>
            </div>
            <div className="bg-bar-gold/10 rounded-2xl rounded-tr-sm p-4 max-w-[85%] ml-auto border border-bar-gold/20">
              <p className="text-bar-cream/90 text-sm">
                Yes, I need appointment booking and lead capture for my consulting business.
              </p>
            </div>
            <div className="bg-bar-burgundy/20 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
              <p className="text-bar-cream/90 text-sm">
                That&apos;s a smooth choice. I&apos;ll set up The Appointment Setter template with AI
                booking and automatic follow-up. Strong lead-capture finish.
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </Section>
  );
}
