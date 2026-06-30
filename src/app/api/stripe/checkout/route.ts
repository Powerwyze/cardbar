import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CARD_PRICES } from "@/types";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured", url: null },
      { status: 200 }
    );
  }

  const { cardType, aiAddonEnabled, shippingAddress, orderNotes, builderState } =
    await req.json();

  if (!cardType) {
    return NextResponse.json({ error: "Card type required" }, { status: 400 });
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price: cardType === "metal"
        ? process.env.STRIPE_PRICE_METAL_CARD!
        : process.env.STRIPE_PRICE_BASIC_CARD!,
      quantity: 1,
    },
    {
      price: process.env.STRIPE_PRICE_HOSTING!,
      quantity: 1,
    },
  ];

  if (aiAddonEnabled && process.env.STRIPE_PRICE_AI_ADDON) {
    lineItems.push({
      price: process.env.STRIPE_PRICE_AI_ADDON,
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/build/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/build`,
    metadata: {
      cardType,
      aiAddonEnabled: String(aiAddonEnabled),
      orderNotes: orderNotes ?? "",
      builderState: JSON.stringify(builderState),
    },
    shipping_address_collection: shippingAddress
      ? undefined
      : { allowed_countries: ["US", "CA"] },
  });

  return NextResponse.json({ url: session.url });
}
