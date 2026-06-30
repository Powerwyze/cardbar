import { NextResponse } from "next/server";
import { getConnectorStatus } from "@/lib/env";

export async function GET() {
  const connectors = getConnectorStatus();
  const configured = connectors.filter((c) => c.configured).length;
  const total = connectors.length;

  return NextResponse.json({
    status: configured === total ? "ready" : "partial",
    configured,
    total,
    connectors: connectors.map((c) => ({
      name: c.name,
      configured: c.configured,
      missing: c.missing,
    })),
    setup: {
      stripe: "STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe.mjs",
      supabase: "Run supabase/migrations/001_initial.sql and 002_storage.sql in SQL editor",
      render: "Connect GitHub repo in Render Dashboard or use render.yaml blueprint",
      verify: "node scripts/verify-env.mjs",
    },
  });
}
