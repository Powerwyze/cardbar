import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TEMPLATE_COMPONENTS } from "@/components/landing-templates";
import {
  BRANDED_PAGE_SLUGS,
  getBrandedLandingPage,
} from "@/components/landing-templates/branded-pages";
import { DEMO_DATA } from "@/lib/templates/types";
import type { TemplateType, LandingPageData } from "@/lib/templates/types";
import { TapTracker } from "@/components/landing-templates/TapTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function hasPublicSupabaseConfig() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function generateStaticParams() {
  return BRANDED_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brandedPage = getBrandedLandingPage(slug);

  if (!brandedPage) {
    return {};
  }

  return {
    title: brandedPage.title,
    description: brandedPage.description,
  };
}

export default async function PublicLandingPage({ params }: PageProps) {
  const { slug } = await params;

  if (hasPublicSupabaseConfig()) {
    const supabase = await createClient();
    const { data: page, error } = await supabase
      .from("landing_pages")
      .select("*")
      .eq("page_slug", slug)
      .eq("published_status", true)
      .maybeSingle();

    if (!error && page) {
      const data: LandingPageData = {
        profileName: page.profile_name ?? "Guest",
        title: "",
        companyName: page.company_name ?? "",
        bio: page.bio ?? "",
        phone: "",
        email: "",
        website: "",
        themeColors: (page.theme_colors as string[]) ?? ["#C9A962", "#0A0A0B"],
        links: (page.links as { label: string; url: string }[]) ?? [],
        socialLinks: {},
      };
      const templateType: TemplateType = page.template_type;
      const Template =
        TEMPLATE_COMPONENTS[templateType] ?? TEMPLATE_COMPONENTS["classic-contact"];

      return (
        <>
          <TapTracker landingPageId={page.id} cardOrderId={page.card_order_id} />
          <Template data={data} />
        </>
      );
    }
  }

  const brandedPage = getBrandedLandingPage(slug);

  if (brandedPage) {
    const BrandedPage = brandedPage.Component;
    return (
      <>
        <TapTracker landingPageId={null} cardOrderId={null} />
        <BrandedPage />
      </>
    );
  }

  if (slug === "demo") {
    const data: LandingPageData = DEMO_DATA;
    const templateType: TemplateType = "classic-contact";
    const Template =
      TEMPLATE_COMPONENTS[templateType] ?? TEMPLATE_COMPONENTS["classic-contact"];

    return (
      <>
        <TapTracker landingPageId={null} cardOrderId={null} />
        <Template data={data} />
      </>
    );
  }

  notFound();
}
