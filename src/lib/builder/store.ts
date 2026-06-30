"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BuilderState, CardType, TemplateType, ShippingAddress, ProfileData } from "@/types";

const defaultProfile: ProfileData = {
  businessName: "",
  fullName: "",
  title: "",
  phone: "",
  email: "",
  website: "",
  socialLinks: {},
  bio: "",
  brandColors: ["#C9A962", "#0A0A0B"],
};

interface BuilderStore extends BuilderState {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCardType: (type: CardType) => void;
  setLogoUrl: (url: string | null) => void;
  setArtworkUrl: (url: string | null) => void;
  setHeadshotUrl: (url: string | null) => void;
  setBrandColors: (colors: string[]) => void;
  updateProfileData: (data: Partial<ProfileData>) => void;
  setDesignPrompt: (prompt: string) => void;
  setDesignStyle: (style: string | null) => void;
  setSelectedTemplate: (template: TemplateType | null) => void;
  toggleAutomation: (automation: string) => void;
  setSelectedAutomations: (automations: string[]) => void;
  setCustomAutomation: (text: string) => void;
  setAiAddonEnabled: (enabled: boolean) => void;
  setShippingAddress: (address: ShippingAddress | null) => void;
  setOrderNotes: (notes: string) => void;
  reset: () => void;
  getTotalPrice: () => { card: number; hosting: number; ai: number; total: number };
}

const initialState: BuilderState = {
  step: 1,
  cardType: null,
  logoUrl: null,
  artworkUrl: null,
  headshotUrl: null,
  brandColors: ["#C9A962", "#0A0A0B"],
  profileData: defaultProfile,
  designPrompt: "",
  designStyle: null,
  selectedTemplate: null,
  selectedAutomations: [],
  customAutomation: "",
  aiAddonEnabled: false,
  shippingAddress: null,
  orderNotes: "",
};

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 6) })),
      prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
      setCardType: (cardType) => set({ cardType }),
      setLogoUrl: (logoUrl) => set({ logoUrl }),
      setArtworkUrl: (artworkUrl) => set({ artworkUrl }),
      setHeadshotUrl: (headshotUrl) => set({ headshotUrl }),
      setBrandColors: (brandColors) => set({ brandColors }),
      updateProfileData: (data) =>
        set((s) => ({ profileData: { ...s.profileData, ...data } })),
      setDesignPrompt: (designPrompt) => set({ designPrompt }),
      setDesignStyle: (designStyle) => set({ designStyle }),
      setSelectedTemplate: (selectedTemplate) => set({ selectedTemplate }),
      toggleAutomation: (automation) =>
        set((s) => ({
          selectedAutomations: s.selectedAutomations.includes(automation)
            ? s.selectedAutomations.filter((a) => a !== automation)
            : [...s.selectedAutomations, automation],
        })),
      setSelectedAutomations: (selectedAutomations) => set({ selectedAutomations }),
      setCustomAutomation: (customAutomation) => set({ customAutomation }),
      setAiAddonEnabled: (aiAddonEnabled) => set({ aiAddonEnabled }),
      setShippingAddress: (shippingAddress) => set({ shippingAddress }),
      setOrderNotes: (orderNotes) => set({ orderNotes }),
      reset: () => set(initialState),
      getTotalPrice: () => {
        const s = get();
        const card = s.cardType === "metal" ? 50 : s.cardType === "basic" ? 30 : 0;
        const hosting = 5;
        const ai = s.aiAddonEnabled ? 10 : 0;
        return { card, hosting, ai, total: card + hosting + ai };
      },
    }),
    {
      name: "cardbar-builder",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        step: state.step,
        cardType: state.cardType,
        logoUrl: state.logoUrl,
        artworkUrl: state.artworkUrl,
        headshotUrl: state.headshotUrl,
        brandColors: state.brandColors,
        profileData: state.profileData,
        designPrompt: state.designPrompt,
        designStyle: state.designStyle,
        selectedTemplate: state.selectedTemplate,
        selectedAutomations: state.selectedAutomations,
        customAutomation: state.customAutomation,
        aiAddonEnabled: state.aiAddonEnabled,
        shippingAddress: state.shippingAddress,
        orderNotes: state.orderNotes,
      }),
    }
  )
);
