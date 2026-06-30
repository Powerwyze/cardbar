"use client";

import { useBuilderStore } from "@/lib/builder/store";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { getTemplate } from "@/lib/templates";
import { NfcCardMockup } from "@/components/ui/NfcCardMockup";

export function LivePreview() {
  const {
    cardType,
    profileData,
    selectedTemplate,
    logoUrl,
    headshotUrl,
    brandColors,
    selectedAutomations,
    aiAddonEnabled,
  } = useBuilderStore();

  const template = selectedTemplate ? getTemplate(selectedTemplate) : null;

  return (
    <div className="space-y-4">
      <p className="text-bar-amber text-xs uppercase tracking-wider">Live Preview</p>

      <GlassPanel className="p-6" glow>
        <div className="flex justify-center mb-6">
          <NfcCardMockup
            variant={cardType ?? "metal"}
            name={profileData.fullName || "Your Name"}
            title={profileData.title || "Your Title"}
          />
        </div>

        {/* Landing page preview */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: `${brandColors[0]}44` }}
        >
          <div
            className="p-6 text-center"
            style={{
              background: `linear-gradient(180deg, ${brandColors[1] ?? "#0A0A0B"} 0%, ${brandColors[1] ?? "#1A1A1D"}ee 100%)`,
            }}
          >
            {headshotUrl ? (
              <img src={headshotUrl} alt="Profile" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2" style={{ borderColor: brandColors[0] }} />
            ) : logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full mx-auto mb-3 border-2 flex items-center justify-center" style={{ borderColor: brandColors[0], background: `${brandColors[0]}22` }}>
                <span className="text-2xl">👤</span>
              </div>
            )}
            <p className="font-serif text-bar-cream text-lg">{profileData.fullName || "Your Name"}</p>
            <p className="text-bar-cream/50 text-sm">{profileData.title || "Your Title"}</p>
            {profileData.businessName && (
              <p className="text-bar-cream/40 text-xs mt-1">{profileData.businessName}</p>
            )}

            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {["Save Contact", "Email", "Call"].map((btn) => (
                <div
                  key={btn}
                  className="px-3 py-1.5 rounded-full text-xs border"
                  style={{ borderColor: `${brandColors[0]}66`, color: brandColors[0] }}
                >
                  {btn}
                </div>
              ))}
            </div>
          </div>
        </div>

        {template && (
          <p className="text-center text-bar-cream/40 text-xs mt-3">
            Template: {template.name}
          </p>
        )}

        {selectedAutomations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-bar-gold/10">
            <p className="text-bar-amber/60 text-xs uppercase tracking-wider mb-2">Automations</p>
            <div className="flex flex-wrap gap-1">
              {selectedAutomations.slice(0, 3).map((a) => (
                <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-bar-burgundy/30 text-bar-cream/60">
                  {a}
                </span>
              ))}
              {selectedAutomations.length > 3 && (
                <span className="text-[10px] text-bar-cream/40">+{selectedAutomations.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {aiAddonEnabled && (
          <div className="mt-3 flex items-center gap-2 text-xs text-bar-amber">
            <span>✦</span> AI Cardologist enabled
          </div>
        )}
      </GlassPanel>
    </div>
  );
}
