"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: "cus_placeholder" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Billing portal not configured. Contact hello@thecard.bar");
    } catch {
      alert("Unable to open billing portal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <GlassPanel className="p-6">
        <h3 className="font-serif text-lg text-bar-cream mb-4">Active Subscriptions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-bar-smoke">
            <div>
              <p className="text-bar-cream text-sm font-medium">Keep Your Card on Tap</p>
              <p className="text-bar-cream/40 text-xs">Hosting & management</p>
            </div>
            <div className="text-right">
              <p className="text-bar-gold font-medium">$5/mo</p>
              <p className="text-green-400 text-xs">Active</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-bar-smoke">
            <div>
              <p className="text-bar-cream text-sm font-medium">Add the Cardologist</p>
              <p className="text-bar-cream/40 text-xs">AI assistant add-on</p>
            </div>
            <div className="text-right">
              <p className="text-bar-gold font-medium">$10/mo</p>
              <p className="text-bar-cream/40 text-xs">Not active</p>
            </div>
          </div>
        </div>
      </GlassPanel>

      <GoldButton onClick={handlePortal} disabled={loading}>
        {loading ? "Opening..." : "Manage Billing"}
      </GoldButton>
    </div>
  );
}
