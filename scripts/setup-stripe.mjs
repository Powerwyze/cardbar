#!/usr/bin/env node
/**
 * Creates Stripe products & prices for The Card Bar.
 * Usage: STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe.mjs
 *
 * Or connect the Stripe plugin/connector in Cursor and paste the output price IDs into .env.local
 */

import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Set STRIPE_SECRET_KEY to run this script.");
  process.exit(1);
}

const stripe = new Stripe(key);

const PRODUCTS = [
  { name: "The Classic Pour — Basic NFC Card", price: 3000, type: "one_time", envKey: "STRIPE_PRICE_BASIC_CARD" },
  { name: "The Reserve Pour — Metal NFC Card", price: 5000, type: "one_time", envKey: "STRIPE_PRICE_METAL_CARD" },
  { name: "Keep Your Card on Tap — Hosting", price: 500, type: "recurring", envKey: "STRIPE_PRICE_HOSTING" },
  { name: "Add the Cardologist — AI Add-On", price: 1000, type: "recurring", envKey: "STRIPE_PRICE_AI_ADDON" },
];

console.log("\n🍸 The Card Bar — Stripe Setup\n");

const envLines = [];

for (const p of PRODUCTS) {
  const product = await stripe.products.create({
    name: p.name,
    metadata: { app: "thecard.bar" },
  });

  const priceParams = {
    product: product.id,
    unit_amount: p.price,
    currency: "usd",
    ...(p.type === "recurring" ? { recurring: { interval: "month" } } : {}),
  };

  const price = await stripe.prices.create(priceParams);
  envLines.push(`${p.envKey}=${price.id}`);
  console.log(`✓ ${p.name}`);
  console.log(`  Product: ${product.id}`);
  console.log(`  Price:   ${price.id} ($${p.price / 100}${p.type === "recurring" ? "/mo" : ""})\n`);
}

console.log("Add these to .env.local:\n");
console.log(envLines.join("\n"));
console.log("\nAlso set:");
console.log("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...");
console.log("STRIPE_SECRET_KEY=sk_test_...");
console.log("\nWebhook (after deploy):");
console.log("  stripe listen --forward-to localhost:3000/api/webhooks/stripe");
console.log("  → copy whsec_... to STRIPE_WEBHOOK_SECRET\n");
