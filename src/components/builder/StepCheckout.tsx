"use client";

import { useState } from "react";
import { useBuilderStore } from "@/lib/builder/store";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { formatCurrency } from "@/lib/utils";
import { HOSTING_PRICE, AI_ADDON_PRICE } from "@/types";

export function StepCheckout() {
  const {
    cardType,
    aiAddonEnabled,
    setAiAddonEnabled,
    shippingAddress,
    setShippingAddress,
    orderNotes,
    setOrderNotes,
    getTotalPrice,
    prevStep,
    profileData,
  } = useBuilderStore();

  const [loading, setLoading] = useState(false);
  const prices = getTotalPrice();

  const address = shippingAddress ?? {
    name: profileData.fullName,
    line1: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardType,
          aiAddonEnabled,
          shippingAddress: address,
          orderNotes,
          builderState: useBuilderStore.getState(),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout is not configured yet. Your order details have been saved.");
      }
    } catch {
      alert("Checkout unavailable. Please contact hello@thecard.bar to complete your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassPanel className="p-6 md:p-8">
      <h2 className="font-serif text-2xl text-bar-cream mb-2">Start Your Tab</h2>
      <p className="text-bar-cream/60 text-sm mb-6">Review your order and complete checkout.</p>

      <div className="bg-bar-charcoal/50 rounded-xl p-5 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-bar-cream/70">{cardType === "metal" ? "Metal Card" : "Basic Card"}</span>
          <span className="text-bar-cream">{formatCurrency(prices.card)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-bar-cream/70">Hosting (required)</span>
          <span className="text-bar-cream">{formatCurrency(HOSTING_PRICE)}/mo</span>
        </div>
        {aiAddonEnabled && (
          <div className="flex justify-between text-sm">
            <span className="text-bar-cream/70">AI Add-On</span>
            <span className="text-bar-cream">{formatCurrency(AI_ADDON_PRICE)}/mo</span>
          </div>
        )}
        <div className="border-t border-bar-gold/10 pt-3 flex justify-between">
          <span className="text-bar-cream font-medium">Due today</span>
          <span className="font-serif text-xl text-gradient-gold">{formatCurrency(prices.card)}</span>
        </div>
        <p className="text-bar-cream/40 text-xs">
          + {formatCurrency(HOSTING_PRICE)}/mo hosting{aiAddonEnabled ? ` + ${formatCurrency(AI_ADDON_PRICE)}/mo AI` : ""}
        </p>
      </div>

      <label className="flex items-center gap-3 p-4 rounded-xl border border-bar-smoke hover:border-bar-gold/30 cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={aiAddonEnabled}
          onChange={(e) => setAiAddonEnabled(e.target.checked)}
          className="w-4 h-4 accent-bar-gold"
        />
        <div>
          <p className="text-bar-cream text-sm font-medium">Add the Cardologist AI (+$10/mo)</p>
          <p className="text-bar-cream/50 text-xs">AI assistant for questions, booking, and lead capture</p>
        </div>
      </label>

      <div className="space-y-4 mb-6">
        <h3 className="text-bar-cream/50 text-xs uppercase tracking-wider">Shipping Address</h3>
        {[
          { key: "name", label: "Full Name", placeholder: "Alex Rivera" },
          { key: "line1", label: "Address", placeholder: "123 Main St" },
          { key: "city", label: "City", placeholder: "New York" },
          { key: "state", label: "State", placeholder: "NY" },
          { key: "zip", label: "ZIP", placeholder: "10001" },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-bar-cream/40 text-xs">{field.label}</label>
            <input
              value={String(address[field.key as keyof typeof address] ?? "")}
              onChange={(e) => setShippingAddress({ ...address, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2 text-sm text-bar-cream placeholder:text-bar-cream/20 focus:outline-none focus:border-bar-gold/50"
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="text-bar-cream/50 text-xs uppercase tracking-wider">Order Notes</label>
        <textarea
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          placeholder="Any special instructions for your card..."
          rows={2}
          className="w-full mt-1 bg-bar-charcoal/50 border border-bar-smoke rounded-lg px-4 py-2 text-sm text-bar-cream placeholder:text-bar-cream/20 focus:outline-none focus:border-bar-gold/50 resize-none"
        />
      </div>

      <GlassPanel className="p-4 mb-6 border-bar-amber/20">
        <p className="text-bar-amber text-sm">
          Your signature card is being mixed. Our team will review your design, build your landing
          page, connect your automation, and prepare your card for shipping within 24 hours.
        </p>
      </GlassPanel>

      <div className="flex gap-3">
        <GoldButton onClick={prevStep} variant="ghost" className="flex-1">Back</GoldButton>
        <GoldButton onClick={handleCheckout} disabled={loading || !cardType} className="flex-1">
          {loading ? "Processing..." : "Complete Order"}
        </GoldButton>
      </div>
    </GlassPanel>
  );
}
