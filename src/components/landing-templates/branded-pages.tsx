import Link from "next/link";
import type { ReactNode } from "react";

const GET_SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/getsocialmiami/";
const GIV_HYDRATION_SITE_URL = "https://www.givhydration.com/";
const GIV_HYDRATION_BOOKING_URL = "https://givhydration.janeapp.com/";
const GLAMQUEST_SITE_URL = "https://glamquest.com/";

export const BRANDED_PAGE_SLUGS = [
  "getsocial-miami",
  "giv-hydration",
  "glamquest-beauty",
] as const;

export type BrandedPageSlug = (typeof BRANDED_PAGE_SLUGS)[number];

export interface BrandedLandingPageDefinition {
  slug: BrandedPageSlug;
  title: string;
  description: string;
  officialUrl: string;
  Component: () => ReactNode;
}

function Shell({
  background,
  children,
}: {
  background: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background }}>
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-4 py-4 sm:px-5 sm:py-5">
        {children}
      </div>
    </div>
  );
}

function ButtonLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform hover:scale-[1.01] ${className}`}
    >
      {children}
    </a>
  );
}

function SourceLinks({
  links,
  className,
}: {
  links: { label: string; href: string }[];
  className: string;
}) {
  return (
    <div className={`rounded-[28px] border px-5 py-4 ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">
        Official links
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors hover:bg-black/5"
          >
            <span>{link.label}</span>
            <span aria-hidden="true">Open</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function PoweredFooter({
  className,
  accentClassName,
}: {
  className: string;
  accentClassName: string;
}) {
  return (
    <footer className={`mt-6 pb-4 text-center text-xs ${className}`}>
      Powered by{" "}
      <Link href="/" className={`font-semibold underline underline-offset-4 ${accentClassName}`}>
        The Card Bar
      </Link>
    </footer>
  );
}

function GetSocialMiamiLandingPage() {
  return (
    <Shell background="radial-gradient(circle at top, #ffd6a6 0%, #ff8d72 24%, #1d2342 60%, #090714 100%)">
      <div className="relative flex-1 rounded-[34px] border border-white/12 bg-[#0a0d19]/82 px-5 py-5 text-white shadow-[0_30px_90px_rgba(6,8,24,0.45)] backdrop-blur">
        <div className="pointer-events-none absolute -right-10 top-12 h-28 w-28 rounded-full bg-[#3ce4c9]/28 blur-3xl" />
        <div className="pointer-events-none absolute -left-8 bottom-24 h-36 w-36 rounded-full bg-[#ff6c86]/20 blur-3xl" />

        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#ffd7a1]">
            Miami social energy
          </p>
          <div className="mt-4 rounded-[28px] border border-white/12 bg-white/6 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white/70">Official profile</p>
                <h1 className="mt-1 font-serif text-4xl leading-none">Get Social!</h1>
              </div>
              <div className="rounded-full border border-white/15 bg-white/8 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#3ce4c9]">
                Instagram
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/78">
              A Miami social and community brand with an Instagram-first presence. Follow the
              official profile for the latest look at what the brand is sharing publicly.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <ButtonLink
                href={GET_SOCIAL_INSTAGRAM_URL}
                className="bg-gradient-to-r from-[#ffae5c] via-[#ff727f] to-[#7a8cff] text-[#09101c]"
              >
                Open Get Social Miami on Instagram
              </ButtonLink>
              <ButtonLink
                href={GET_SOCIAL_INSTAGRAM_URL}
                className="border border-white/15 bg-white/6 text-white"
              >
                View the official profile source
              </ButtonLink>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {[
              {
                title: "Miami-rooted",
                body: "Built around a social presence that feels local, upbeat, and community-led.",
              },
              {
                title: "Instagram-first",
                body: "The supplied public source is the official Instagram profile, so the page keeps that front and center.",
              },
              {
                title: "Tap-friendly",
                body: "Fast access to the profile makes this a simple landing page to scan, tap, and share in person.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/12 bg-white/7 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3ce4c9]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/72">{item.body}</p>
              </div>
            ))}
          </div>

          <SourceLinks
            className="mt-4 border-white/12 bg-white/7 text-white/85"
            links={[
              {
                label: "Official Instagram: @getsocialmiami",
                href: GET_SOCIAL_INSTAGRAM_URL,
              },
            ]}
          />
        </div>
      </div>
      <PoweredFooter className="text-white/72" accentClassName="text-[#ffd7a1]" />
    </Shell>
  );
}

function GivHydrationLandingPage() {
  return (
    <Shell background="linear-gradient(180deg, #f7ffff 0%, #d7f3ef 42%, #c4e5e0 100%)">
      <div className="relative flex-1 rounded-[34px] border border-[#0d6760]/10 bg-white/82 px-5 py-5 text-[#083431] shadow-[0_28px_70px_rgba(7,52,49,0.16)] backdrop-blur">
        <div className="pointer-events-none absolute right-3 top-3 h-24 w-24 rounded-full bg-[#46d0c0]/18 blur-3xl" />
        <div className="pointer-events-none absolute bottom-16 left-0 h-40 w-40 rounded-full bg-[#138d87]/10 blur-3xl" />

        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0f8e87]">
            Mobile IV concierge
          </p>
          <div className="mt-4 rounded-[30px] border border-[#0d6760]/10 bg-white px-5 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#0d6760]">GIV Hydration</p>
                <h1 className="mt-2 font-serif text-4xl leading-none text-[#093633]">
                  Wellness on your schedule.
                </h1>
              </div>
              <div className="rounded-full bg-[#e5f7f3] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f8e87]">
                Miami-Dade + Broward
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#315957]">
              Green IV Hydration describes itself as a mobile IV concierge serving Miami-Dade and
              Broward County, with care designed to meet you where you are.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <ButtonLink
                href={GIV_HYDRATION_BOOKING_URL}
                className="bg-[#0f8e87] text-white"
              >
                Book mobile IV concierge care
              </ButtonLink>
              <ButtonLink
                href={GIV_HYDRATION_SITE_URL}
                className="border border-[#0d6760]/12 bg-[#effaf8] text-[#0b4f4b]"
              >
                Visit the official GIV website
              </ButtonLink>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {[
              {
                name: "Immunity",
                description: "Support-focused hydration service highlighted on the official site.",
              },
              {
                name: "Performance & Recovery",
                description: "Positioned for recovery time and athletic performance support.",
              },
              {
                name: "Hangover Relief",
                description: "A reboot-focused option centered on hydration-related recovery.",
              },
              {
                name: "Myers Cocktail",
                description: "An all-in-one drip presented for seasoned wellness clients and newcomers.",
              },
              {
                name: "Beauty / Inner Glow",
                description: "Beauty-oriented hydration support for skin-focused wellness.",
              },
            ].map((service) => (
              <div
                key={service.name}
                className="rounded-[24px] border border-[#0d6760]/10 bg-white/88 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-[#0a4642]">{service.name}</h2>
                  <span className="rounded-full bg-[#effaf8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f8e87]">
                    Service
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#416a68]">{service.description}</p>
              </div>
            ))}
          </div>

          <SourceLinks
            className="mt-4 border-[#0d6760]/10 bg-white/88 text-[#083431]"
            links={[
              {
                label: "Official website: givhydration.com",
                href: GIV_HYDRATION_SITE_URL,
              },
              {
                label: "Official booking: givhydration.janeapp.com",
                href: GIV_HYDRATION_BOOKING_URL,
              },
            ]}
          />
        </div>
      </div>
      <PoweredFooter className="text-[#205451]" accentClassName="text-[#0b5b56]" />
    </Shell>
  );
}

function GlamquestBeautyLandingPage() {
  return (
    <Shell background="linear-gradient(180deg, #fff8f0 0%, #ffe6de 40%, #f8c7cf 100%)">
      <div className="relative flex-1 rounded-[34px] border border-[#7e2437]/10 bg-[#fff9f6]/86 px-5 py-5 text-[#35161e] shadow-[0_28px_70px_rgba(126,36,55,0.14)] backdrop-blur">
        <div className="pointer-events-none absolute -right-6 top-6 h-28 w-28 rounded-full bg-[#cb3159]/15 blur-3xl" />
        <div className="pointer-events-none absolute left-4 top-28 h-20 w-20 rounded-full bg-[#ffb198]/20 blur-3xl" />

        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b53b57]">
            Melanin-centered K-beauty
          </p>
          <div className="mt-4 rounded-[30px] border border-[#7e2437]/10 bg-white/78 p-5">
            <div className="rounded-[24px] bg-[#fff0ec] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b53b57]">
                Glamquest Beauty
              </p>
              <h1 className="mt-2 font-serif text-4xl leading-none text-[#461d27]">
                The first K-beauty brand for melanin skin.
              </h1>
              <p className="mt-4 text-sm leading-6 text-[#68444d]">
                Glamquest positions itself as Black-founded, formulated for melanin-rich skin,
                made in South Korea, and designed around hyperpigmentation and barrier repair.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {[
                "Black-founded",
                "Made in South Korea",
                "Hyperpigmentation + barrier repair",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-[#7e2437]/10 bg-white/90 px-4 py-3 text-sm font-medium text-[#5f3240]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <ButtonLink
                href={GLAMQUEST_SITE_URL}
                className="bg-[#c53d5d] text-white"
              >
                Shop Glamquest Beauty on the official site
              </ButtonLink>
              <ButtonLink
                href={GLAMQUEST_SITE_URL}
                className="border border-[#7e2437]/12 bg-[#fff5f1] text-[#7c2a3d]"
              >
                Explore the official Glamquest website
              </ButtonLink>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {[
              {
                label: "Hydration",
                body: "The public site emphasizes melanin-loving hydration and barrier support.",
              },
              {
                label: "Brightening",
                body: "The brand messaging centers hyperpigmentation care and a more even-looking complexion.",
              },
              {
                label: "Editorial finish",
                body: "The visual direction keeps the page polished, beauty-led, and mobile-friendly without inventing product claims.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-[#7e2437]/10 bg-white/80 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b53b57]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#68444d]">{item.body}</p>
              </div>
            ))}
          </div>

          <SourceLinks
            className="mt-4 border-[#7e2437]/10 bg-white/82 text-[#35161e]"
            links={[
              {
                label: "Official website: glamquest.com",
                href: GLAMQUEST_SITE_URL,
              },
            ]}
          />
        </div>
      </div>
      <PoweredFooter className="text-[#6f3d49]" accentClassName="text-[#922b45]" />
    </Shell>
  );
}

export const BRANDED_LANDING_PAGES: Record<BrandedPageSlug, BrandedLandingPageDefinition> = {
  "getsocial-miami": {
    slug: "getsocial-miami",
    title: "Get Social! Miami",
    description:
      "A Miami social and community landing page that routes visitors to the official Get Social Instagram profile.",
    officialUrl: GET_SOCIAL_INSTAGRAM_URL,
    Component: GetSocialMiamiLandingPage,
  },
  "giv-hydration": {
    slug: "giv-hydration",
    title: "GIV Hydration",
    description:
      "A mobile-first wellness landing page for Green IV Hydration with official site and booking CTAs.",
    officialUrl: GIV_HYDRATION_SITE_URL,
    Component: GivHydrationLandingPage,
  },
  "glamquest-beauty": {
    slug: "glamquest-beauty",
    title: "Glamquest Beauty",
    description:
      "An editorial beauty landing page for Glamquest focused on melanin-centered K-beauty and the official shop.",
    officialUrl: GLAMQUEST_SITE_URL,
    Component: GlamquestBeautyLandingPage,
  },
};

export function getBrandedLandingPage(slug: string): BrandedLandingPageDefinition | null {
  return BRANDED_LANDING_PAGES[slug as BrandedPageSlug] ?? null;
}
