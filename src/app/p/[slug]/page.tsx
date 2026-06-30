import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TEMPLATE_COMPONENTS } from "@/components/landing-templates";
import { DEMO_DATA } from "@/lib/templates/types";
import type { TemplateType, LandingPageData } from "@/lib/templates/types";
import { TapTracker } from "@/components/landing-templates/TapTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: page } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("page_slug", slug)
    .eq("published_status", true)
    .single();

  let data: LandingPageData;
  let templateType: TemplateType = "classic-contact";
  let pageId: string | null = null;
  let orderId: string | null = null;

  if (page) {
    pageId = page.id;
    orderId = page.card_order_id;
    templateType = page.template_type;
    data = {
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
  } else if (slug === "demo") {
    data = DEMO_DATA;
    templateType = "classic-contact";
  } else {
    notFound();
  }

  const Template = TEMPLATE_COMPONENTS[templateType] ?? TEMPLATE_COMPONENTS["classic-contact"];

  return (
    <>
      <TapTracker landingPageId={pageId} cardOrderId={orderId} />
      <Template data={data} />
    </>
  );
}
