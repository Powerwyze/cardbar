import type { TemplateType } from "@/types";

export interface LandingPageData {
  profileName: string;
  title: string;
  companyName: string;
  bio: string;
  phone: string;
  email: string;
  website: string;
  photoUrl?: string;
  logoUrl?: string;
  themeColors: string[];
  links: { label: string; url: string }[];
  socialLinks: Record<string, string>;
}

export interface LandingPageProps {
  data: LandingPageData;
  onCtaClick?: (cta: string) => void;
}

export const DEMO_DATA: LandingPageData = {
  profileName: "The Card Bar",
  title: "NFC Business Cards, Served Smart",
  companyName: "The Card Bar",
  bio: "Custom NFC business cards paired with branded landing pages, automations, and AI-powered follow-up.",
  phone: "",
  email: "",
  website: "https://thecard.bar",
  themeColors: ["#C9A962", "#0A0A0B"],
  links: [
    { label: "Build Your Card", url: "/build" },
    { label: "View Pricing", url: "/pricing" },
    { label: "Browse Use Cases", url: "/use-cases" },
  ],
  socialLinks: {},
};

export type { TemplateType };
