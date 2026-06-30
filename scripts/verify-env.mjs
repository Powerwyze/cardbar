#!/usr/bin/env node
/**
 * Verifies connector/env configuration for The Card Bar.
 * Usage: node scripts/verify-env.mjs
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Load .env.local if present
const envLocal = resolve(root, ".env.local");
if (existsSync(envLocal)) {
  const lines = readFileSync(envLocal, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq);
    const v = trimmed.slice(eq + 1);
    if (!process.env[k]) process.env[k] = v;
  }
}

const CONNECTORS = [
  {
    name: "Supabase",
    plugin: "Supabase MCP / Dashboard connector",
    keys: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"],
    setup: "Create project at supabase.com → Settings → API → copy keys. Run supabase/migrations/001_initial.sql",
  },
  {
    name: "Stripe",
    plugin: "Stripe Dashboard / CLI",
    keys: ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_PRICE_BASIC_CARD", "STRIPE_PRICE_METAL_CARD", "STRIPE_PRICE_HOSTING", "STRIPE_PRICE_AI_ADDON"],
    setup: "Run: STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe.mjs",
  },
  {
    name: "Stripe Webhooks",
    plugin: "Stripe CLI",
    keys: ["STRIPE_WEBHOOK_SECRET"],
    setup: "stripe listen --forward-to localhost:3000/api/webhooks/stripe",
    optional: true,
  },
  {
    name: "OpenAI (Cardologist)",
    plugin: "OpenAI API",
    keys: ["OPENAI_API_KEY"],
    setup: "platform.openai.com → API keys. Set LLM_PROVIDER=openai",
    optional: true,
  },
  {
    name: "Anthropic (Cardologist)",
    plugin: "Anthropic API",
    keys: ["ANTHROPIC_API_KEY"],
    setup: "console.anthropic.com → API keys. Set LLM_PROVIDER=anthropic",
    optional: true,
  },
  {
    name: "Render",
    plugin: "Render MCP plugin in Cursor",
    keys: ["NEXT_PUBLIC_APP_URL"],
    setup: "Deploy via render.yaml blueprint or Render Dashboard. Set env vars on the web service.",
  },
];

console.log("\n🍸 The Card Bar — Connector Status\n");
console.log(`Env file: ${existsSync(envLocal) ? ".env.local ✓" : ".env.local ✗ (create from .env.example)"}\n`);

let allRequiredOk = true;

for (const c of CONNECTORS) {
  const missing = c.keys.filter((k) => !process.env[k]);
  const ok = missing.length === 0;
  const icon = ok ? "✓" : c.optional ? "○" : "✗";
  console.log(`${icon} ${c.name}`);
  console.log(`  Connector: ${c.plugin}`);
  if (!ok) {
    if (!c.optional) allRequiredOk = false;
    console.log(`  Missing: ${missing.join(", ")}`);
    console.log(`  Setup: ${c.setup}`);
  } else {
    console.log(`  All keys present`);
  }
  console.log();
}

console.log(allRequiredOk ? "Ready for full integration.\n" : "Some connectors need configuration. Site runs in demo mode without them.\n");
