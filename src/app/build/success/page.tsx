import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";
import { Navbar } from "@/components/marketing/Navbar";
import { CheckCircle } from "lucide-react";

export default function BuildSuccessPage() {
  return (
    <div className="min-h-screen bg-bar-black">
      <Navbar />
      <div className="pt-24 pb-12 px-4 flex items-center justify-center min-h-[80vh]">
        <GlassPanel className="p-8 md:p-12 max-w-lg text-center" glow>
          <CheckCircle size={48} className="text-bar-gold mx-auto mb-6" />
          <h1 className="font-serif text-3xl text-bar-cream mb-4">Your Signature Card is Being Mixed</h1>
          <p className="text-bar-cream/60 leading-relaxed mb-6">
            Our team will review your design, build your landing page, connect your automation,
            and prepare your card for shipping within 24 hours.
          </p>
          <div className="flex flex-col gap-3">
            <GoldButton href="/dashboard">Go to My Bottle Shelf</GoldButton>
            <GoldButton href="/" variant="outline">Back to Home</GoldButton>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
