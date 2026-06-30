import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";

const ORDER_STATUSES = [
  "new_order", "design_pending", "in_review", "landing_page_build",
  "automation_build", "ready_to_encode", "ready_to_ship", "shipped", "completed",
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bar-black">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-bar-amber text-sm tracking-widest uppercase mb-1">Admin</p>
            <h1 className="font-serif text-3xl text-bar-cream">Order Pipeline</h1>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-bar-burgundy/40 text-bar-amber border border-bar-gold/20">
            Staff Only
          </span>
        </div>
        <nav className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {ORDER_STATUSES.map((status) => (
            <span
              key={status}
              className="text-xs px-3 py-1 rounded-full bg-bar-charcoal text-bar-cream/50 whitespace-nowrap border border-bar-smoke"
            >
              {status.replace(/_/g, " ")}
            </span>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}

export { ORDER_STATUSES };
