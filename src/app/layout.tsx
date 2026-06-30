import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/cardologist/ChatWidget";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Card Bar — NFC Business Cards, Served Smart",
    template: "%s | The Card Bar",
  },
  description:
    "Custom NFC business cards with branded landing pages, automations, and AI agents. Built and shipped in 24 hours.",
  keywords: ["NFC business card", "digital business card", "smart business card", "AI business card"],
  openGraph: {
    title: "The Card Bar",
    description: "Your Business Card, Served Smart.",
    url: "https://thecard.bar",
    siteName: "The Card Bar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-bar-black text-bar-cream">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
