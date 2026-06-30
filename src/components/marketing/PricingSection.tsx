import { Section, SectionHeader } from "@/components/ui/Section";
import { MenuCard } from "@/components/ui/MenuCard";
import { GoldButton } from "@/components/ui/GoldButton";

export function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHeader
        label="The Menu"
        title="Choose Your Pour"
        subtitle="Every order includes a custom landing page, automation setup, and 24-hour build & ship."
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MenuCard
          barName="The Classic Pour"
          name="Basic Card"
          price="$30"
          description="Custom printed NFC business card with full digital experience."
          features={[
            "Custom printed NFC card",
            "Custom landing page",
            "Basic automations",
            "Built-to-order setup",
            "24-hour build & ship",
          ]}
        >
          <GoldButton href="/build" variant="outline" className="w-full">
            Order Basic
          </GoldButton>
        </MenuCard>

        <MenuCard
          barName="The Reserve Pour"
          name="Metal Card"
          price="$50"
          description="Premium metal NFC card for executives and founders."
          features={[
            "Premium metal NFC card",
            "Custom landing page",
            "Basic automations",
            "Built-to-order setup",
            "24-hour build & ship",
          ]}
          highlighted
          badge="Most Popular"
        >
          <GoldButton href="/build" className="w-full">
            Order Metal
          </GoldButton>
        </MenuCard>

        <MenuCard
          barName="Keep Your Card on Tap"
          name="Hosting"
          price="$5"
          period="/month"
          description="Required monthly hosting keeps your card's digital experience live."
          features={[
            "Hosted landing page",
            "NFC card management",
            "Automation hosting",
            "Profile & link updates",
            "Analytics dashboard",
          ]}
        >
          <p className="text-bar-amber/60 text-xs text-center">Required with every card</p>
        </MenuCard>

        <MenuCard
          barName="Add the Cardologist"
          name="AI Add-On"
          price="$10"
          period="/month"
          description="Make your card interactive with an AI assistant."
          features={[
            "AI assistant on your card",
            "AI lead capture",
            "Appointment scheduling",
            "Voice or chat agent",
            "AI FAQ & follow-up",
          ]}
        >
          <GoldButton href="/build" variant="outline" className="w-full">
            Add AI
          </GoldButton>
        </MenuCard>
      </div>
      <div className="text-center mt-8">
        <GoldButton href="/pricing" variant="ghost">
          View Full Menu →
        </GoldButton>
      </div>
    </Section>
  );
}
