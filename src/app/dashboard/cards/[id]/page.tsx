"use client";

import { use } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { TEMPLATES } from "@/lib/templates";
import Link from "next/link";

export default function CardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/dashboard" className="text-bar-gold text-sm hover:underline">← Back to Shelf</Link>

      <GlassPanel className="p-6">
        <h2 className="font-serif text-2xl text-bar-cream mb-6">Signature Serve — Card Settings</h2>

        <div className="space-y-6">
          <section>
            <h3 className="text-bar-amber text-xs uppercase tracking-wider mb-3">Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Full Name", "Title", "Company", "Email", "Phone", "Website"].map((field) => (
                <div key={field}>
                  <label className="text-bar-cream/40 text-xs">{field}</label>
                  <input
                    className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-3 py-2 text-sm text-bar-cream focus:outline-none focus:border-bar-gold/50"
                    placeholder={field}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-bar-amber text-xs uppercase tracking-wider mb-3">Landing Page Template</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TEMPLATES.slice(0, 6).map((t) => (
                <button
                  key={t.id}
                  className="p-3 rounded-xl border border-bar-smoke hover:border-bar-gold/40 text-left transition-all"
                >
                  <p className="text-bar-cream text-xs font-medium">{t.name}</p>
                  <p className="text-bar-cream/40 text-[10px]">{t.bestFor}</p>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-bar-amber text-xs uppercase tracking-wider mb-3">AI Add-On</h3>
            <label className="flex items-center gap-3 p-4 rounded-xl border border-bar-smoke cursor-pointer">
              <input type="checkbox" className="accent-bar-gold" />
              <div>
                <p className="text-bar-cream text-sm">Enable The Cardologist AI ($10/mo)</p>
                <p className="text-bar-cream/40 text-xs">AI chat, lead capture, and booking on your card</p>
              </div>
            </label>
          </section>

          <section>
            <h3 className="text-bar-amber text-xs uppercase tracking-wider mb-3">Request Custom Automation</h3>
            <textarea
              rows={3}
              placeholder="Describe a custom automation you'd like us to build..."
              className="w-full bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-3 text-sm text-bar-cream placeholder:text-bar-cream/20 focus:outline-none focus:border-bar-gold/50 resize-none"
            />
          </section>

          <div className="flex gap-3">
            <GoldButton className="flex-1">Save Changes</GoldButton>
            <GoldButton href="/build" variant="outline" className="flex-1">Duplicate Card</GoldButton>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
