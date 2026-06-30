import { Hero } from "@/components/marketing/Hero";
import { ProductExplanation } from "@/components/marketing/ProductExplanation";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PricingSection } from "@/components/marketing/PricingSection";
import { BuilderPreview } from "@/components/marketing/BuilderPreview";
import { TemplateCarousel } from "@/components/marketing/TemplateCarousel";
import { TapSimulator } from "@/components/simulator/TapSimulator";
import { AIAddonSection } from "@/components/marketing/AIAddonSection";
import { UseCasesPreview } from "@/components/marketing/UseCasesPreview";
import { Testimonials } from "@/components/marketing/Testimonials";
import { FAQ } from "@/components/marketing/FAQ";
import { FinalCTA } from "@/components/marketing/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductExplanation />
      <HowItWorks />
      <PricingSection />
      <BuilderPreview />
      <TemplateCarousel />
      <TapSimulator />
      <AIAddonSection />
      <UseCasesPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
