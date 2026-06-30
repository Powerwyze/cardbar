import { createClient } from "@/lib/supabase/server";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import Link from "next/link";
import { NfcCardMockup } from "@/components/ui/NfcCardMockup";
import { BarChart3, Users, MousePointer, MessageCircle } from "lucide-react";

const DEMO_STATS = {
  totalTaps: 247,
  uniqueVisitors: 189,
  leadsCaptured: 34,
  aiConversations: 12,
};

const DEMO_CARDS: Array<{
  id: string;
  name: string;
  title: string;
  type: "basic" | "metal";
  status: string;
  template: string;
  slug: string;
}> = [
  {
    id: "1",
    name: "Alex Rivera",
    title: "Founder & CEO",
    type: "metal" as const,
    status: "shipped",
    template: "Executive Reserve",
    slug: "alex-rivera",
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let orders = DEMO_CARDS;
  if (user) {
    const { data } = await supabase
      .from("card_orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data && data.length > 0) {
      orders = data.map((o) => ({
        id: o.id,
        name: (o.profile_data as { fullName?: string })?.fullName ?? "Your Card",
        title: (o.profile_data as { title?: string })?.title ?? "",
        type: o.card_type as "basic" | "metal",
        status: o.order_status,
        template: o.selected_template ?? "classic-contact",
        slug: o.id.slice(0, 8),
      }));
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Taps", value: DEMO_STATS.totalTaps, icon: MousePointer },
          { label: "Unique Visitors", value: DEMO_STATS.uniqueVisitors, icon: Users },
          { label: "Leads Captured", value: DEMO_STATS.leadsCaptured, icon: BarChart3 },
          { label: "AI Conversations", value: DEMO_STATS.aiConversations, icon: MessageCircle },
        ].map(({ label, value, icon: Icon }) => (
          <GlassPanel key={label} className="p-5">
            <Icon size={18} className="text-bar-gold mb-2" />
            <p className="font-serif text-2xl text-bar-cream">{value}</p>
            <p className="text-bar-cream/40 text-xs mt-1">{label}</p>
          </GlassPanel>
        ))}
      </div>

      {/* Cards shelf */}
      <div>
        <h2 className="font-serif text-xl text-bar-cream mb-4">Your Cards</h2>
        {orders.length === 0 ? (
          <GlassPanel className="p-12 text-center">
            <p className="text-bar-cream/50 mb-4">No cards yet. Time to mix your first signature pour.</p>
            <GoldButton href="/build">Start Mixing My Card</GoldButton>
          </GlassPanel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((card) => (
              <GlassPanel key={card.id} className="p-6">
                <div className="flex justify-center mb-4">
                  <NfcCardMockup variant={card.type} name={card.name} title={card.title} />
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-serif text-lg text-bar-cream">{card.name}</h3>
                  <p className="text-bar-cream/50 text-sm">{card.title}</p>
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-bar-burgundy/30 text-bar-amber capitalize">
                    {card.status.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/cards/${card.id}`} className="flex-1">
                    <GoldButton variant="outline" className="w-full text-sm">Manage</GoldButton>
                  </Link>
                  <Link href={`/p/${card.slug}`} className="flex-1">
                    <GoldButton className="w-full text-sm">View Page</GoldButton>
                  </Link>
                </div>
              </GlassPanel>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
