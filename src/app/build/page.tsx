"use client";

import { useBuilderStore } from "@/lib/builder/store";
import { Navbar } from "@/components/marketing/Navbar";
import { StepChoosePour } from "@/components/builder/StepChoosePour";
import { StepCraftLabel } from "@/components/builder/StepCraftLabel";
import { StepLandingPage } from "@/components/builder/StepLandingPage";
import { StepAutomations } from "@/components/builder/StepAutomations";
import { StepSimulator } from "@/components/builder/StepSimulator";
import { StepCheckout } from "@/components/builder/StepCheckout";
import { LivePreview } from "@/components/builder/LivePreview";
import { BuilderProgress } from "@/components/builder/BuilderProgress";

const STEPS = [
  { num: 1, bar: "Choose Your Pour" },
  { num: 2, bar: "Craft Your Label" },
  { num: 3, bar: "Select Your Landing Page Mix" },
  { num: 4, bar: "Add Your Garnish" },
  { num: 5, bar: "Preview the Pour" },
  { num: 6, bar: "Start Your Tab" },
];

export default function BuildPage() {
  const { step } = useBuilderStore();

  const renderStep = () => {
    switch (step) {
      case 1: return <StepChoosePour />;
      case 2: return <StepCraftLabel />;
      case 3: return <StepLandingPage />;
      case 4: return <StepAutomations />;
      case 5: return <StepSimulator />;
      case 6: return <StepCheckout />;
      default: return <StepChoosePour />;
    }
  };

  return (
    <div className="min-h-screen bg-bar-black">
      <Navbar />
      <div className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-bar-amber text-sm tracking-widest uppercase mb-2">Card Builder</p>
          <h1 className="font-serif text-3xl md:text-4xl text-bar-cream">
            {STEPS[step - 1]?.bar}
          </h1>
          <BuilderProgress steps={STEPS} currentStep={step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">{renderStep()}</div>
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <LivePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
