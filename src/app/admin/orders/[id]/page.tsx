"use client";

import { use, useState } from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";

const STATUSES = [
  "new_order", "design_pending", "in_review", "landing_page_build",
  "automation_build", "ready_to_encode", "ready_to_ship", "shipped", "completed",
];

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [status, setStatus] = useState("design_pending");
  const [tracking, setTracking] = useState("");

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-bar-gold text-sm hover:underline">← Back to Orders</Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassPanel className="p-6">
            <h2 className="font-serif text-xl text-bar-cream mb-4">Order {id.slice(0, 8)}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Customer", "Alex Rivera"],
                ["Email", "alex@rivera.com"],
                ["Card Type", "Metal ($50)"],
                ["Template", "Executive Reserve"],
                ["AI Add-On", "Enabled ($10/mo)"],
                ["Hosting", "Active ($5/mo)"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-bar-cream/40 text-xs uppercase tracking-wider">{label}</p>
                  <p className="text-bar-cream mt-1">{value}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="font-serif text-lg text-bar-cream mb-4">Uploaded Assets</h3>
            <div className="grid grid-cols-3 gap-4">
              {["Logo", "Card Artwork", "Headshot"].map((asset) => (
                <div key={asset} className="aspect-square rounded-xl border border-dashed border-bar-smoke flex items-center justify-center">
                  <p className="text-bar-cream/30 text-xs">{asset}</p>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="font-serif text-lg text-bar-cream mb-4">Automation Request</h3>
            <p className="text-bar-cream/70 text-sm leading-relaxed">
              When someone taps my card, send them my Calendly and text me their name.
              Add new leads to HubSpot and send a thank-you email.
            </p>
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-6">
            <h3 className="font-serif text-lg text-bar-cream mb-4">Update Status</h3>
            <div className="space-y-2 mb-4">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs capitalize transition-all ${
                    status === s
                      ? "bg-bar-gold/15 border border-bar-gold/40 text-bar-gold"
                      : "text-bar-cream/50 hover:bg-bar-charcoal"
                  }`}
                >
                  {s.replace(/_/g, " ")}
                </button>
              ))}
            </div>
            <GoldButton className="w-full">Update Status</GoldButton>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="font-serif text-lg text-bar-cream mb-4">Shipping</h3>
            <input
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              placeholder="Tracking number"
              className="w-full bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-3 py-2 text-sm text-bar-cream mb-3 focus:outline-none focus:border-bar-gold/50"
            />
            <GoldButton variant="outline" className="w-full">Mark as Shipped</GoldButton>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h3 className="font-serif text-lg text-bar-cream mb-4">Upload Mockup</h3>
            <div className="aspect-video rounded-xl border border-dashed border-bar-smoke flex items-center justify-center mb-3">
              <p className="text-bar-cream/30 text-xs">Final card mockup</p>
            </div>
            <GoldButton variant="outline" className="w-full">Upload Mockup</GoldButton>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
