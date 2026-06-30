"use client";

import { useState } from "react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Bell, UserPlus, Mail } from "lucide-react";

const STEPS = [
  { id: "tap", label: "Simulate the Tap", icon: "📱" },
  { id: "landing", label: "Landing Page Opens", icon: "🌐" },
  { id: "action", label: "Visitor Takes Action", icon: "👆" },
  { id: "automation", label: "Shake the Automation", icon: "⚡" },
  { id: "confirm", label: "Confirmation Sent", icon: "✅" },
];

interface TapSimulatorProps {
  compact?: boolean;
  automations?: string[];
}

export function TapSimulator({ compact, automations = ["Send contact info by email", "Add lead to CRM"] }: TapSimulatorProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [running, setRunning] = useState(false);

  const runSimulation = async () => {
    setRunning(true);
    setActiveStep(0);
    for (let i = 0; i < STEPS.length; i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, 1200));
    }
    setRunning(false);
  };

  const content = (
  <div className={compact ? "" : "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"}>
    <div className="space-y-4">
      {STEPS.map((step, i) => (
        <motion.div
          key={step.id}
          className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
            activeStep === i && running
              ? "bg-bar-burgundy/30 border border-bar-gold/40"
              : activeStep > i
              ? "opacity-60"
              : "opacity-40"
          }`}
          animate={activeStep === i && running ? { x: [0, 4, 0] } : {}}
          transition={{ repeat: activeStep === i && running ? Infinity : 0, duration: 0.5 }}
        >
          <span className="text-2xl">{step.icon}</span>
          <div>
            <p className="text-bar-cream text-sm font-medium">{step.label}</p>
            {activeStep === i && running && (
              <p className="text-bar-amber text-xs">In progress...</p>
            )}
            {activeStep > i && (
              <p className="text-bar-gold text-xs flex items-center gap-1">
                <CheckCircle size={12} /> Complete
              </p>
            )}
          </div>
        </motion.div>
      ))}
      <GoldButton onClick={runSimulation} disabled={running} className="w-full">
        {running ? "Testing the Pour..." : "Test the Pour"}
      </GoldButton>
    </div>

    {!compact && (
      <GlassPanel className="p-6">
        <p className="text-bar-amber text-xs uppercase tracking-wider mb-4">Preview the Flow</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {activeStep === 0 && (
              <div className="text-center py-8">
                <div className="w-48 h-28 mx-auto rounded-xl bg-gradient-to-br from-bar-charcoal to-bar-walnut border border-bar-gold/30 flex items-center justify-center mb-4 animate-float">
                  <div className="w-6 h-6 rounded-full bg-bar-amber/60 animate-nfc-pulse" />
                </div>
                <p className="text-bar-cream/60 text-sm">NFC card tapped...</p>
              </div>
            )}
            {activeStep === 1 && (
              <div className="bg-bar-black rounded-2xl p-4 border border-bar-smoke">
                <div className="w-10 h-10 rounded-full bg-bar-gold/20 mx-auto mb-3" />
                <div className="h-2 bg-bar-gold/30 rounded w-2/3 mx-auto mb-2" />
                <div className="h-1.5 bg-bar-smoke rounded w-1/2 mx-auto" />
              </div>
            )}
            {activeStep === 2 && (
              <div className="space-y-2">
                <div className="h-8 rounded-lg bg-bar-burgundy/40 border border-bar-gold/20 flex items-center px-3">
                  <span className="text-xs text-bar-cream">Fill Lead Form</span>
                </div>
                <div className="h-8 rounded-lg bg-bar-gold/20 border border-bar-gold/30 flex items-center px-3">
                  <span className="text-xs text-bar-cream">Book Appointment</span>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="space-y-2">
                {automations.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-bar-cream/80">
                    <CheckCircle size={14} className="text-bar-gold" />
                    {a}
                  </div>
                ))}
              </div>
            )}
            {activeStep === 4 && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-bar-burgundy/20">
                  <Bell size={16} className="text-bar-amber" />
                  <span className="text-sm text-bar-cream">You received a tap notification</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-bar-burgundy/20">
                  <UserPlus size={16} className="text-bar-gold" />
                  <span className="text-sm text-bar-cream">Lead saved to CRM</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-bar-burgundy/20">
                  <Mail size={16} className="text-bar-copper" />
                  <span className="text-sm text-bar-cream">Follow-up email sent</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </GlassPanel>
    )}
  </div>
  );

  if (compact) return content;

  return (
    <Section>
      <SectionHeader
        label="Test the Pour"
        title="Preview What Happens After Every Tap"
        subtitle="Simulate the full flow — from NFC tap to automation to confirmation."
        centered
      />
      {content}
    </Section>
  );
}
