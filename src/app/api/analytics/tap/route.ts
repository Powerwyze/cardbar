import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { landingPageId, cardOrderId, deviceType, referrer, clickedCta } =
    await req.json();

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: true });
  }

  await supabase.from("tap_analytics").insert({
    landing_page_id: landingPageId,
    card_order_id: cardOrderId,
    device_type: deviceType ?? "unknown",
    referrer: referrer ?? null,
    clicked_cta: clickedCta ?? null,
    tap_time: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
