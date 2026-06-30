import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/server";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const supabase = createServiceClient();

    if (supabase) {
      const builderState = session.metadata?.builderState
        ? JSON.parse(session.metadata.builderState)
        : {};

      await supabase.from("card_orders").insert({
        card_type: session.metadata?.cardType ?? "basic",
        price: session.metadata?.cardType === "metal" ? 50 : 30,
        order_status: "new_order",
        ai_addon_enabled: session.metadata?.aiAddonEnabled === "true",
        hosting_subscription_status: "active",
        ai_addon_status: session.metadata?.aiAddonEnabled === "true" ? "active" : "inactive",
        stripe_session_id: session.id,
        stripe_customer_id: session.customer as string,
        automation_request: builderState.customAutomation ?? null,
        selected_automations: builderState.selectedAutomations ?? [],
        selected_template: builderState.selectedTemplate ?? null,
        profile_data: builderState.profileData ?? null,
        design_style: builderState.designStyle ?? null,
        order_notes: session.metadata?.orderNotes ?? null,
        shipping_address: builderState.shippingAddress ?? null,
      });
    }
  }

  return NextResponse.json({ received: true });
}
