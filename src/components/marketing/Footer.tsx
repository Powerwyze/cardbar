import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-bar-gold/10 bg-bar-charcoal py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bar-gold to-bar-amber flex items-center justify-center">
                <span className="text-bar-black font-serif font-bold text-sm">CB</span>
              </div>
              <span className="font-serif text-bar-cream text-lg">The Card Bar</span>
            </div>
            <p className="text-bar-cream/50 text-sm leading-relaxed max-w-sm">
              Custom NFC business cards, branded landing pages, automations, and AI agents —
              mixed into one unforgettable tap.
            </p>
            <p className="text-bar-amber/60 text-sm italic mt-2">
              Tap Into Your Signature Connection.
            </p>
          </div>

          <div>
            <h4 className="text-bar-gold text-sm font-medium tracking-wider uppercase mb-4">Menu</h4>
            <ul className="space-y-2">
              {[
                { href: "/pricing", label: "Pricing" },
                { href: "/build", label: "Build Your Card" },
                { href: "/use-cases", label: "AI Use Cases" },
                { href: "/dashboard", label: "My Bottle Shelf" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-bar-cream/50 text-sm hover:text-bar-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-bar-gold text-sm font-medium tracking-wider uppercase mb-4">Support</h4>
            <ul className="space-y-2">
              {[
                { href: "/#faq", label: "FAQ" },
                { href: "mailto:hello@thecard.bar", label: "hello@thecard.bar" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-bar-cream/50 text-sm hover:text-bar-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-bar-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-bar-cream/30 text-xs">
            © {new Date().getFullYear()} The Card Bar. All rights reserved.
          </p>
          <p className="text-bar-cream/30 text-xs">
            Crafted Cards. Smart Automations. Instant Connections.
          </p>
        </div>
      </div>
    </footer>
  );
}
