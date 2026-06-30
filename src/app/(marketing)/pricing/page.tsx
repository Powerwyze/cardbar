import { Section, SectionHeader } from "@/components/ui/Section";
import { MenuCard } from "@/components/ui/MenuCard";
import { GoldButton } from "@/components/ui/GoldButton";
import { GlassPanel } from "@/components/ui/GlassPanel";

export const metadata = {
  title: "Pricing Menu",
  description: "The Card Bar pricing — Basic and Metal NFC cards, hosting, and AI add-on.",
};

export default function PricingPage() {
  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="The Menu"
          title="Our Signature Selections"
          subtitle="Every pour includes a custom landing page, automation setup, and our 24-hour build & ship promise."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <MenuCard
            barName="The Classic Pour"
            name="Basic Card"
            price="$30"
            description="A refined printed NFC card for professionals who want smart connections without the premium metal finish."
            features={[
              "Custom printed NFC business card",
              "Custom landing page",
              "Basic automations",
              "Built-to-order setup",
              "24-hour build & ship option",
            ]}
          >
            <GoldButton href="/build" variant="outline" className="w-full">
              Order The Classic Pour
            </GoldButton>
          </MenuCard>

          <MenuCard
            barName="The Reserve Pour"
            name="Metal Card"
            price="$50"
            description="Top-shelf metal NFC card for executives, founders, and anyone who makes a statement."
            features={[
              "Premium metal NFC business card",
              "Custom landing page",
              "Basic automations",
              "Built-to-order setup",
              "24-hour build & ship option",
            ]}
            highlighted
            badge="Signature Selection"
          >
            <GoldButton href="/build" className="w-full">
              Order The Reserve Pour
            </GoldButton>
          </MenuCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MenuCard
            barName="Keep Your Card on Tap"
            name="Monthly Hosting"
            price="$5"
            period="/month · required"
            description="Your landing page and automations are hosted and managed by The Card Bar. This keeps your card's digital experience live, updated, and measurable."
            features={[
              "Hosted landing page",
              "NFC card management",
              "Basic automation hosting",
              "Profile & link updates",
              "Analytics dashboard",
            ]}
          />

          <MenuCard
            barName="Add the Cardologist"
            name="AI Add-On"
            price="$10"
            period="/month · optional"
            description="Make your card interactive with an AI assistant that answers questions, books meetings, and captures leads around the clock."
            features={[
              "AI assistant on your card",
              "AI lead capture",
              "Appointment scheduling",
              "Voice or chat agent options",
              "AI FAQ & follow-up support",
            ]}
          >
            <GoldButton href="/build" variant="outline" className="w-full">
              Add the Cardologist
            </GoldButton>
          </MenuCard>
        </div>

        <GlassPanel className="p-8 mt-12 text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl text-bar-cream mb-4">The Full Experience</h3>
          <p className="text-bar-cream/60 leading-relaxed mb-2">
            The physical NFC card is only part of the product. The real value is your custom landing
            page, automations, AI options, and the ongoing hosted experience.
          </p>
          <p className="text-bar-amber text-sm italic">
            You don&apos;t need to know how to build automations — just upload a logo, drop a link,
            or describe what you want. We&apos;ll mix it to order.
          </p>
        </GlassPanel>
      </Section>
    </>
  );
}
