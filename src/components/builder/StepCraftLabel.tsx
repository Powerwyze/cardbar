"use client";

import { useRef, useState } from "react";
import { useBuilderStore } from "@/lib/builder/store";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { DESIGN_PRESETS } from "@/types";
import { Upload, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function StepCraftLabel() {
  const {
    profileData,
    updateProfileData,
    designPrompt,
    setDesignPrompt,
    designStyle,
    setDesignStyle,
    setLogoUrl,
    setHeadshotUrl,
    logoUrl,
    headshotUrl,
    brandColors,
    setBrandColors,
    nextStep,
    prevStep,
  } = useBuilderStore();

  const [generating, setGenerating] = useState(false);
  const logoRef = useRef<HTMLInputElement>(null);
  const headshotRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File, setter: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => setter(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const generateDesigns = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGenerating(false);
  };

  return (
    <GlassPanel className="p-6 md:p-8">
      <h2 className="font-serif text-2xl text-bar-cream mb-2">Craft Your Label</h2>
      <p className="text-bar-cream/60 text-sm mb-6">
        Upload your assets or describe your perfect card to The Cardologist.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <UploadBox
          label="Logo"
          preview={logoUrl}
          onClick={() => logoRef.current?.click()}
        />
        <UploadBox
          label="Headshot"
          preview={headshotUrl}
          onClick={() => headshotRef.current?.click()}
        />
        <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], setLogoUrl)} />
        <input ref={headshotRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], setHeadshotUrl)} />
      </div>

      <div className="space-y-4 mb-6">
        {[
          { key: "fullName", label: "Full Name", placeholder: "Alex Rivera" },
          { key: "title", label: "Title", placeholder: "Founder & CEO" },
          { key: "businessName", label: "Business Name", placeholder: "Rivera Consulting" },
          { key: "email", label: "Email", placeholder: "alex@example.com" },
          { key: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
          { key: "website", label: "Website", placeholder: "https://example.com" },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-bar-cream/50 text-xs uppercase tracking-wider">{field.label}</label>
            <input
              value={profileData[field.key as keyof typeof profileData] as string}
              onChange={(e) => updateProfileData({ [field.key]: e.target.value })}
              placeholder={field.placeholder}
              className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2.5 text-sm text-bar-cream placeholder:text-bar-cream/20 focus:outline-none focus:border-bar-gold/50"
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="text-bar-cream/50 text-xs uppercase tracking-wider">Brand Colors</label>
        <div className="flex gap-3 mt-2">
          {brandColors.map((color, i) => (
            <input
              key={i}
              type="color"
              value={color}
              onChange={(e) => {
                const updated = [...brandColors];
                updated[i] = e.target.value;
                setBrandColors(updated);
              }}
              className="w-10 h-10 rounded-lg cursor-pointer border border-bar-smoke"
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-bar-cream/50 text-xs uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={12} /> AI Design Prompt
        </label>
        <textarea
          value={designPrompt}
          onChange={(e) => setDesignPrompt(e.target.value)}
          placeholder="Describe your perfect card. Example: black metal card, gold logo, luxury real estate vibe, minimal design."
          rows={3}
          className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2.5 text-sm text-bar-cream placeholder:text-bar-cream/20 focus:outline-none focus:border-bar-gold/50 resize-none"
        />
      </div>

      <div className="mb-6">
        <p className="text-bar-cream/50 text-xs uppercase tracking-wider mb-3">Design Styles</p>
        <div className="flex flex-wrap gap-2">
          {DESIGN_PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => setDesignStyle(preset)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                designStyle === preset
                  ? "border-bar-gold bg-bar-gold/10 text-bar-gold"
                  : "border-bar-smoke text-bar-cream/60 hover:border-bar-gold/30"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {generating ? (
        <div className="flex items-center justify-center gap-3 py-4 mb-6">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-2xl"
          >
            🍸
          </motion.div>
          <p className="text-bar-amber text-sm">The Cardologist is mixing your designs...</p>
        </div>
      ) : (
        designPrompt && (
          <GoldButton onClick={generateDesigns} variant="outline" className="w-full mb-6">
            Generate Card Concepts
          </GoldButton>
        )
      )}

      <div className="flex gap-3">
        <GoldButton onClick={prevStep} variant="ghost" className="flex-1">Back</GoldButton>
        <GoldButton onClick={nextStep} className="flex-1">Continue — Select Your Mix</GoldButton>
      </div>
    </GlassPanel>
  );
}

function UploadBox({ label, preview, onClick }: { label: string; preview: string | null; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="aspect-square rounded-xl border border-dashed border-bar-smoke hover:border-bar-gold/40 flex flex-col items-center justify-center gap-2 transition-all overflow-hidden"
    >
      {preview ? (
        <img src={preview} alt={label} className="w-full h-full object-cover" />
      ) : (
        <>
          <Upload size={20} className="text-bar-cream/30" />
          <span className="text-bar-cream/40 text-xs">{label}</span>
        </>
      )}
    </button>
  );
}
