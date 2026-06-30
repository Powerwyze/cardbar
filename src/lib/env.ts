import { z } from "zod";

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_").optional(),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_").optional(),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_").optional(),
  STRIPE_PRICE_BASIC_CARD: z.string().startsWith("price_").optional(),
  STRIPE_PRICE_METAL_CARD: z.string().startsWith("price_").optional(),
  STRIPE_PRICE_HOSTING: z.string().startsWith("price_").optional(),
  STRIPE_PRICE_AI_ADDON: z.string().startsWith("price_").optional(),

  // LLM
  LLM_PROVIDER: z.enum(["openai", "anthropic"]).default("openai"),
  OPENAI_API_KEY: z.string().min(1).optional(),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  return envSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRICE_BASIC_CARD: process.env.STRIPE_PRICE_BASIC_CARD,
    STRIPE_PRICE_METAL_CARD: process.env.STRIPE_PRICE_METAL_CARD,
    STRIPE_PRICE_HOSTING: process.env.STRIPE_PRICE_HOSTING,
    STRIPE_PRICE_AI_ADDON: process.env.STRIPE_PRICE_AI_ADDON,
    LLM_PROVIDER: process.env.LLM_PROVIDER ?? "openai",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  });
}

export type ConnectorStatus = {
  name: string;
  configured: boolean;
  required: string[];
  missing: string[];
};

export function getConnectorStatus(): ConnectorStatus[] {
  const e = process.env;

  const check = (name: string, keys: string[], required = true): ConnectorStatus => {
    const missing = keys.filter((k) => !e[k]);
    return { name, configured: missing.length === 0, required: keys, missing };
  };

  return [
    check("Supabase", [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
    ]),
    check("Stripe (core)", ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"]),
    check("Stripe (prices)", [
      "STRIPE_PRICE_BASIC_CARD",
      "STRIPE_PRICE_METAL_CARD",
      "STRIPE_PRICE_HOSTING",
      "STRIPE_PRICE_AI_ADDON",
    ]),
    check("Stripe (webhooks)", ["STRIPE_WEBHOOK_SECRET"], false),
    check("OpenAI (Cardologist)", ["OPENAI_API_KEY"], false),
    check("Anthropic (Cardologist)", ["ANTHROPIC_API_KEY"], false),
  ];
}

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function isStripeConfigured(): boolean {
  return !!(
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_PRICE_BASIC_CARD &&
    process.env.STRIPE_PRICE_METAL_CARD &&
    process.env.STRIPE_PRICE_HOSTING
  );
}

export function isLlmConfigured(): boolean {
  const provider = process.env.LLM_PROVIDER ?? "openai";
  if (provider === "anthropic") return !!process.env.ANTHROPIC_API_KEY;
  return !!process.env.OPENAI_API_KEY;
}
