import { createClient } from "@/lib/supabase/server";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import Link from "next/link";

const DEMO_ORDERS = [
  {
    id: "ord-001",
    customer: "Alex Rivera",
    email: "alex@rivera.com",
    cardType: "metal",
    template: "executive-reserve",
    status: "design_pending",
    aiAddon: true,
    createdAt: "2026-06-28",
  },
  {
    id: "ord-002",
    customer: "Sarah Chen",
    email: "sarah@luxe.com",
    cardType: "basic",
    template: "lead-generator",
    status: "landing_page_build",
    aiAddon: false,
    createdAt: "2026-06-27",
  },
  {
    id: "ord-003",
    customer: "Marcus Williams",
    email: "marcus@realty.com",
    cardType: "metal",
    template: "appointment-setter",
    status: "ready_to_ship",
    aiAddon: true,
    createdAt: "2026-06-26",
  },
];

export default async function AdminPage() {
  const supabase = await createClient();
  let orders = DEMO_ORDERS;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    const { data } = await supabase
      .from("card_orders")
      .select("*, profiles(name, email)")
      .order("created_at", { ascending: false });
    if (data && data.length > 0) {
      orders = data.map((o) => ({
        id: o.id,
        customer: (o.profile_data as { fullName?: string })?.fullName ?? "Unknown",
        email: "",
        cardType: o.card_type,
        template: o.selected_template ?? "classic-contact",
        status: o.order_status,
        aiAddon: o.ai_addon_enabled,
        createdAt: new Date(o.created_at).toLocaleDateString(),
      }));
    }
  }

  return (
    <GlassPanel className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-bar-gold/10 text-bar-cream/50 text-xs uppercase tracking-wider">
              <th className="text-left p-4">Order</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Card</th>
              <th className="text-left p-4">Template</th>
              <th className="text-left p-4">AI</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-bar-smoke/30 hover:bg-bar-burgundy/10 transition-colors">
                <td className="p-4 text-bar-gold font-mono text-xs">{order.id.slice(0, 8)}</td>
                <td className="p-4">
                  <p className="text-bar-cream">{order.customer}</p>
                  <p className="text-bar-cream/40 text-xs">{order.email}</p>
                </td>
                <td className="p-4 text-bar-cream/70 capitalize">{order.cardType}</td>
                <td className="p-4 text-bar-cream/70 text-xs">{order.template}</td>
                <td className="p-4">
                  {order.aiAddon ? (
                    <span className="text-bar-amber text-xs">✦ AI</span>
                  ) : (
                    <span className="text-bar-cream/30 text-xs">—</span>
                  )}
                </td>
                <td className="p-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-bar-burgundy/30 text-bar-amber capitalize">
                    {order.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="p-4 text-bar-cream/50 text-xs">{order.createdAt}</td>
                <td className="p-4">
                  <Link href={`/admin/orders/${order.id}`}>
                    <GoldButton size="sm" variant="outline">View</GoldButton>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}
