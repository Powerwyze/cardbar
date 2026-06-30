"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    q: "What is an NFC business card?",
    a: "An NFC business card has a tiny chip embedded inside. When someone taps it with their phone, it instantly opens your custom landing page — no app required.",
  },
  {
    q: "Do I need an app to use the card?",
    a: "No. Modern smartphones (iPhone and Android) have built-in NFC readers. A simple tap opens your page instantly.",
  },
  {
    q: "What comes with the $30 Basic Card?",
    a: "A custom printed NFC card, custom landing page, basic automation setup, built-to-order configuration, and 24-hour build & ship option.",
  },
  {
    q: "What comes with the $50 Metal Card?",
    a: "A premium metal NFC card with the same digital features — custom landing page, automations, and 24-hour build & ship.",
  },
  {
    q: "Why is there a $5/month hosting fee?",
    a: "Your landing page, automations, and NFC management are hosted and maintained by The Card Bar. The subscription keeps everything live, updated, and includes analytics.",
  },
  {
    q: "What does the $10/month AI add-on do?",
    a: "It adds an AI assistant to your card that can answer questions, book meetings, capture leads, and follow up with visitors 24/7.",
  },
  {
    q: "Can I upload my own logo?",
    a: "Yes. Upload your logo, full card artwork, headshot, and brand colors during the build process.",
  },
  {
    q: "Can you design my card for me?",
    a: "Absolutely. Describe your perfect card to The Cardologist and our team will create custom designs for you.",
  },
  {
    q: "Can I change my landing page later?",
    a: "Yes. Log into My Bottle Shelf dashboard to edit your landing page, links, template, and automations anytime.",
  },
  {
    q: "Can I connect my card to my CRM or calendar?",
    a: "Yes. We support CRM handoffs, calendar booking, Zapier, Make, and Power Automate integrations.",
  },
  {
    q: "Can I request a custom automation?",
    a: "Yes. Describe what you want to happen after a tap and our team builds it to order.",
  },
  {
    q: "How fast do you ship?",
    a: "We build your landing page, connect automations, and ship your card within 24 hours of order confirmation.",
  },
  {
    q: "What happens when someone taps my card?",
    a: "Their phone opens your custom landing page. From there, they can save your contact, fill a form, book a meeting, or trigger any automation you've configured.",
  },
  {
    q: "Can I order multiple cards for my team?",
    a: "Yes. Order additional cards from your dashboard or start a new build for each team member.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq" dark>
      <SectionHeader label="Questions" title="Frequently Asked" centered />
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <GlassPanel key={i} className="overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-bar-cream font-medium pr-4">{item.q}</span>
              <ChevronDown
                size={18}
                className={`text-bar-gold shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-bar-cream/60 text-sm leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        ))}
      </div>
    </Section>
  );
}
