import type { LandingPageProps } from "@/lib/templates/types";

function ContactButtons({ data, accent }: { data: LandingPageProps["data"]; accent: string }) {
  const buttons = [
    { label: "Call", value: `tel:${data.phone}`, show: !!data.phone },
    { label: "Email", value: `mailto:${data.email}`, show: !!data.email },
    { label: "Website", value: data.website, show: !!data.website },
    { label: "Save Contact", value: "#vcard", show: true },
  ].filter((b) => b.show);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {buttons.map((btn) => (
        <a
          key={btn.label}
          href={btn.value}
          className="px-4 py-2 rounded-full text-sm font-medium border transition-opacity hover:opacity-80"
          style={{ borderColor: accent, color: accent }}
        >
          {btn.label}
        </a>
      ))}
    </div>
  );
}

function PageShell({ data, children }: LandingPageProps & { children?: React.ReactNode }) {
  const accent = data.themeColors[0] ?? "#C9A962";
  const bg = data.themeColors[1] ?? "#0A0A0B";

  return (
    <div className="min-h-screen" style={{ background: bg, color: "#F5F0E8" }}>
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.profileName} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2" style={{ borderColor: accent }} />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl border-2" style={{ borderColor: accent, background: `${accent}22` }}>
              {data.profileName.charAt(0)}
            </div>
          )}
          <h1 className="text-2xl font-bold">{data.profileName}</h1>
          <p className="opacity-60">{data.title}</p>
          {data.companyName && <p className="opacity-40 text-sm mt-1">{data.companyName}</p>}
          {data.bio && <p className="opacity-50 text-sm mt-4 leading-relaxed">{data.bio}</p>}
        </div>
        {children}
        <div className="mt-8">
          <ContactButtons data={data} accent={accent} />
        </div>
        <p className="text-center text-xs opacity-20 mt-12">Powered by The Card Bar</p>
      </div>
    </div>
  );
}

export function ClassicContactTemplate({ data }: LandingPageProps) {
  return <PageShell data={data} />;
}

export function LinkLoungeTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  return (
    <PageShell data={data}>
      <div className="space-y-3">
        {data.links.map((link) => (
          <a key={link.label} href={link.url} className="block w-full py-3 px-4 rounded-xl text-center text-sm font-medium border transition-opacity hover:opacity-80" style={{ borderColor: `${accent}66`, color: accent }}>
            {link.label}
          </a>
        ))}
      </div>
    </PageShell>
  );
}

export function LeadGeneratorTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  return (
    <PageShell data={data}>
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        {["Name", "Email", "Phone", "How can we help?"].map((field) => (
          <input key={field} placeholder={field} className="w-full px-4 py-3 rounded-xl bg-white/5 border text-sm focus:outline-none" style={{ borderColor: `${accent}33` }} />
        ))}
        <button type="submit" className="w-full py-3 rounded-xl font-medium text-sm" style={{ background: accent, color: "#0A0A0B" }}>
          Get Started
        </button>
      </form>
    </PageShell>
  );
}

export function AppointmentSetterTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  return (
    <PageShell data={data}>
      <div className="space-y-3">
        {["30-min Consultation", "60-min Strategy Session", "Discovery Call"].map((svc) => (
          <div key={svc} className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: `${accent}33` }}>
            <span className="text-sm">{svc}</span>
            <button className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: accent, color: "#0A0A0B" }}>Book</button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

export function AIConciergeTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  return (
    <PageShell data={data}>
      <div className="space-y-3">
        <button className="w-full py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2" style={{ background: accent, color: "#0A0A0B" }}>
          💬 Chat with AI Assistant
        </button>
        <button className="w-full py-3 rounded-xl text-sm border" style={{ borderColor: `${accent}66`, color: accent }}>
          🎙️ Voice Agent
        </button>
        <div className="p-4 rounded-xl bg-white/5 text-sm opacity-60">
          Ask me anything about our services, pricing, or availability.
        </div>
      </div>
    </PageShell>
  );
}

export function EventNetworkerTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  return (
    <PageShell data={data}>
      <button className="w-full py-4 rounded-xl font-medium text-sm mb-4" style={{ background: accent, color: "#0A0A0B" }}>
        Quick Connect — Exchange Info
      </button>
      <div className="space-y-2">
        {["Product Demo", "Partnership", "Just Networking"].map((opt) => (
          <button key={opt} className="w-full py-2 rounded-lg text-sm border" style={{ borderColor: `${accent}33` }}>{opt}</button>
        ))}
      </div>
    </PageShell>
  );
}

export function CreatorPourTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  return (
    <PageShell data={data}>
      <div className="aspect-video rounded-xl bg-white/5 mb-4 flex items-center justify-center text-sm opacity-40">Latest Video</div>
      <div className="space-y-2">
        {["YouTube", "Spotify", "Merch Store", "Fan Newsletter"].map((link) => (
          <a key={link} href="#" className="block w-full py-3 rounded-xl text-center text-sm border" style={{ borderColor: `${accent}33`, color: accent }}>{link}</a>
        ))}
      </div>
    </PageShell>
  );
}

export function ServiceMenuTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  const services = [
    { name: "Consultation", price: "$150" },
    { name: "Full Service", price: "$500" },
    { name: "Premium Package", price: "$1,200" },
  ];
  return (
    <PageShell data={data}>
      <div className="space-y-3">
        {services.map((svc) => (
          <div key={svc.name} className="flex justify-between items-center p-4 rounded-xl border" style={{ borderColor: `${accent}33` }}>
            <span className="text-sm">{svc.name}</span>
            <span className="text-sm font-medium" style={{ color: accent }}>{svc.price}</span>
          </div>
        ))}
        <button className="w-full py-3 rounded-xl text-sm font-medium" style={{ background: accent, color: "#0A0A0B" }}>Request Quote</button>
      </div>
    </PageShell>
  );
}

export function RestaurantBarTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  return (
    <PageShell data={data}>
      <div className="space-y-3">
        {["View Menu", "Make Reservation", "Get Directions", "Tonight's Specials", "Join SMS List"].map((action) => (
          <button key={action} className="w-full py-3 rounded-xl text-sm border" style={{ borderColor: `${accent}33`, color: accent }}>{action}</button>
        ))}
      </div>
    </PageShell>
  );
}

export function ExecutiveReserveTemplate({ data }: LandingPageProps) {
  const accent = data.themeColors[0] ?? "#C9A962";
  return (
    <PageShell data={data}>
      <div className="space-y-3">
        {["Download vCard", "Press Kit", "Speaking Topics", "Request Meeting", "Company Profile"].map((action) => (
          <button key={action} className="w-full py-3 rounded-xl text-sm border" style={{ borderColor: `${accent}33`, color: accent }}>{action}</button>
        ))}
      </div>
    </PageShell>
  );
}

import type { TemplateType } from "@/types";

export const TEMPLATE_COMPONENTS: Record<TemplateType, React.ComponentType<LandingPageProps>> = {
  "classic-contact": ClassicContactTemplate,
  "link-lounge": LinkLoungeTemplate,
  "lead-generator": LeadGeneratorTemplate,
  "appointment-setter": AppointmentSetterTemplate,
  "ai-concierge": AIConciergeTemplate,
  "event-networker": EventNetworkerTemplate,
  "creator-pour": CreatorPourTemplate,
  "service-menu": ServiceMenuTemplate,
  "restaurant-bar": RestaurantBarTemplate,
  "executive-reserve": ExecutiveReserveTemplate,
};
