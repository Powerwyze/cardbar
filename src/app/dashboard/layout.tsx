import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";

const navItems = [
  { href: "/dashboard", label: "My Bottle Shelf" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/billing", label: "Billing" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bar-black">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-bar-amber text-sm tracking-widest uppercase mb-1">Customer Portal</p>
          <h1 className="font-serif text-3xl text-bar-cream">My Bottle Shelf</h1>
        </div>
        <nav className="flex gap-4 mb-8 border-b border-bar-gold/10 pb-4 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-bar-cream/60 hover:text-bar-gold whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/build" className="text-sm text-bar-amber hover:text-bar-gold whitespace-nowrap ml-auto">
            + Order Another Card
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
