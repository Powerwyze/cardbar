export type CardType = "basic" | "metal";

export type OrderStatus =
  | "new_order"
  | "design_pending"
  | "in_review"
  | "landing_page_build"
  | "automation_build"
  | "ready_to_encode"
  | "ready_to_ship"
  | "shipped"
  | "completed";

export type TemplateType =
  | "classic-contact"
  | "link-lounge"
  | "lead-generator"
  | "appointment-setter"
  | "ai-concierge"
  | "event-networker"
  | "creator-pour"
  | "service-menu"
  | "restaurant-bar"
  | "executive-reserve";

export type UserRole = "customer" | "admin";

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  role: UserRole;
  created_at: string;
}

export interface CardOrder {
  id: string;
  user_id: string | null;
  card_type: CardType;
  price: number;
  hosting_subscription_status: string;
  ai_addon_status: string;
  design_upload_url: string | null;
  logo_url: string | null;
  headshot_url: string | null;
  selected_template: TemplateType | null;
  automation_request: string | null;
  selected_automations: string[];
  order_status: OrderStatus;
  shipping_address: ShippingAddress | null;
  order_notes: string | null;
  ai_addon_enabled: boolean;
  design_style: string | null;
  profile_data: ProfileData | null;
  stripe_session_id: string | null;
  stripe_customer_id: string | null;
  tracking_number: string | null;
  mockup_url: string | null;
  created_at: string;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ProfileData {
  businessName: string;
  fullName: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: Record<string, string>;
  bio: string;
  brandColors: string[];
}

export interface LandingPage {
  id: string;
  user_id: string;
  card_order_id: string;
  template_type: TemplateType;
  page_slug: string;
  profile_name: string | null;
  company_name: string | null;
  bio: string | null;
  links: LinkItem[];
  contact_buttons: ContactButton[];
  lead_form_fields: string[];
  custom_sections: Record<string, unknown>;
  theme_colors: string[];
  published_status: boolean;
  created_at: string;
}

export interface LinkItem {
  label: string;
  url: string;
  icon?: string;
}

export interface ContactButton {
  type: "phone" | "email" | "website" | "vcard" | "custom";
  label: string;
  value: string;
}

export interface Automation {
  id: string;
  user_id: string;
  card_order_id: string;
  automation_type: string;
  automation_description: string | null;
  connected_tool: string | null;
  webhook_url_placeholder: string | null;
  status: string;
}

export interface AIAddon {
  id: string;
  user_id: string;
  card_order_id: string;
  agent_type: string;
  agent_name: string | null;
  agent_description: string | null;
  knowledge_base: string | null;
  status: string;
}

export interface Lead {
  id: string;
  landing_page_id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
}

export interface TapAnalytics {
  id: string;
  card_order_id: string;
  landing_page_id: string;
  tap_time: string;
  device_type: string | null;
  referrer: string | null;
  clicked_cta: string | null;
}

export interface BuilderState {
  step: number;
  cardType: CardType | null;
  logoUrl: string | null;
  artworkUrl: string | null;
  headshotUrl: string | null;
  brandColors: string[];
  profileData: ProfileData;
  designPrompt: string;
  designStyle: string | null;
  selectedTemplate: TemplateType | null;
  selectedAutomations: string[];
  customAutomation: string;
  aiAddonEnabled: boolean;
  shippingAddress: ShippingAddress | null;
  orderNotes: string;
}

export const AUTOMATION_OPTIONS = [
  "Save contact to phone",
  "Send contact info by SMS",
  "Send contact info by email",
  "Add lead to CRM",
  "Send automatic follow-up email",
  "Send brochure or portfolio",
  "Trigger appointment booking",
  "Send a discount code",
  "Add visitor to newsletter",
  "Send menu/catalog",
  "Notify card owner when someone taps card",
  "Send tap data to Google Sheets",
  "Start a lead qualification form",
  "Trigger Zapier/Make/Power Automate webhook",
  "Open an AI chat assistant",
  "Open an AI voice agent",
  "Route visitor to different pages based on selection",
  "Share social content automatically",
  "Start quote request workflow",
  "Send event-specific follow-up",
] as const;

export const DESIGN_PRESETS = [
  "Minimal Luxury",
  "Bold Founder",
  "Real Estate Black & Gold",
  "Creative Neon",
  "Tech Executive",
  "Wellness Clean",
  "Event Promoter",
  "Restaurant Owner",
  "Consultant Premium",
] as const;

export const CARD_PRICES: Record<CardType, number> = {
  basic: 30,
  metal: 50,
};

export const HOSTING_PRICE = 5;
export const AI_ADDON_PRICE = 10;
