import type { TemplateType } from "@/types";

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  barName: string;
  description: string;
  bestFor: string;
  accentColor: string;
  features: string[];
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "classic-contact",
    name: "The Classic Contact",
    barName: "House Pour",
    description: "A refined digital business card with all your essentials.",
    bestFor: "General professionals",
    accentColor: "#C9A962",
    features: ["Contact buttons", "Save to phone", "Social links", "Profile photo"],
  },
  {
    id: "link-lounge",
    name: "The Link Lounge",
    barName: "The Lounge Mix",
    description: "Link-in-bio style with multiple destinations and media.",
    bestFor: "Creators & multi-platform pros",
    accentColor: "#D4A054",
    features: ["Link grid", "Video embed", "Portfolio", "Contact form"],
  },
  {
    id: "lead-generator",
    name: "The Lead Generator",
    barName: "The Closer",
    description: "Capture and qualify leads with smart forms.",
    bestFor: "Sales, realtors, consultants",
    accentColor: "#4A0E1C",
    features: ["Lead form", "Qualification", "CRM handoff", "Auto follow-up"],
  },
  {
    id: "appointment-setter",
    name: "The Appointment Setter",
    barName: "Reserved Seating",
    description: "Book meetings and consultations on the spot.",
    bestFor: "Service businesses",
    accentColor: "#B87333",
    features: ["Calendar embed", "Services list", "Booking CTA", "Reminders"],
  },
  {
    id: "ai-concierge",
    name: "The AI Concierge",
    barName: "The Cardologist Special",
    description: "AI-powered assistant for questions, booking, and leads.",
    bestFor: "AI add-on customers",
    accentColor: "#C9A962",
    features: ["Chat agent", "FAQ", "Voice option", "Lead capture"],
  },
  {
    id: "event-networker",
    name: "The Event Networker",
    barName: "Opening Night",
    description: "Fast contact exchange for conferences and events.",
    bestFor: "Conferences & trade shows",
    accentColor: "#D4A054",
    features: ["Fast exchange", "Event CTA", "Brochure", "Follow-up"],
  },
  {
    id: "creator-pour",
    name: "The Creator Pour",
    barName: "The Headliner",
    description: "Showcase content, merch, and fan engagement.",
    bestFor: "Artists, musicians, streamers",
    accentColor: "#4A0E1C",
    features: ["Content links", "Latest video", "Merch", "Fan signup"],
  },
  {
    id: "service-menu",
    name: "The Service Menu",
    barName: "À La Carte",
    description: "Services, pricing, reviews, and booking in one place.",
    bestFor: "Local service providers",
    accentColor: "#B87333",
    features: ["Services", "Pricing", "Reviews", "Quote request"],
  },
  {
    id: "restaurant-bar",
    name: "The Restaurant/Bar Card",
    barName: "Last Call",
    description: "Menu, reservations, directions, and event specials.",
    bestFor: "Restaurants & nightlife",
    accentColor: "#C9A962",
    features: ["Menu link", "Reservations", "Directions", "SMS signup"],
  },
  {
    id: "executive-reserve",
    name: "The Executive Reserve",
    barName: "Top Shelf",
    description: "Polished executive presence with press and calendar.",
    bestFor: "Executives & founders",
    accentColor: "#D4A054",
    features: ["Bio", "Press links", "Calendar", "vCard download"],
  },
];

export function getTemplate(id: TemplateType): TemplateConfig {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}
