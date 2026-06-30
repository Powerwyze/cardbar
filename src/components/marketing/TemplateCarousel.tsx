"use client";

import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { TEMPLATES } from "@/lib/templates";
import { motion } from "framer-motion";

export function TemplateCarousel() {
  return (
    <Section dark>
      <SectionHeader
        label="Landing Page Mixes"
        title="Select Your Landing Page Mix"
        subtitle="Ten premium templates, each crafted for a different kind of connection."
        centered
      />
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
        {TEMPLATES.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="snap-start shrink-0 w-64"
          >
            <GlassPanel className="p-4 h-full">
              <div
                className="h-32 rounded-xl mb-4 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${template.accentColor}22, #1A1A1D)`,
                  border: `1px solid ${template.accentColor}44`,
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                  <div className="w-8 h-8 rounded-full border border-current opacity-40" style={{ borderColor: template.accentColor }} />
                  <div className="w-16 h-2 rounded opacity-30" style={{ background: template.accentColor }} />
                  <div className="w-12 h-1.5 rounded opacity-20" style={{ background: template.accentColor }} />
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="w-8 h-4 rounded opacity-20" style={{ background: template.accentColor }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-bar-amber/70 text-xs italic mb-1">{template.barName}</p>
              <h3 className="font-serif text-bar-cream text-sm mb-1">{template.name}</h3>
              <p className="text-bar-cream/50 text-xs">{template.bestFor}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
