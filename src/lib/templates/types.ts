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
  profileName: "Alex Rivera",
  title: "Founder & CEO",
  companyName: "Rivera Consulting",
  bio: "Helping businesses grow through strategic consulting and smart technology.",
  phone: "+1 (555) 123-4567",
  email: "alex@rivera.com",
  website: "https://rivera.com",
  themeColors: ["#C9A962", "#0A0A0B"],
  links: [
    { label: "Portfolio", url: "#" },
    { label: "Book a Call", url: "#" },
    { label: "LinkedIn", url: "#" },
  ],
  socialLinks: { linkedin: "#", twitter: "#" },
};

export type { TemplateType };
