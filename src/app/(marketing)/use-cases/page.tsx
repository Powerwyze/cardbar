import { Section, SectionHeader } from "@/components/ui/Section";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GoldButton } from "@/components/ui/GoldButton";

export const metadata = {
  title: "AI NFC Card Use Cases",
  description: "Discover what an AI-powered NFC business card can do for your business.",
};

const USE_CASES = [
  {
    id: "voice",
    letter: "A",
    title: "AI Voice Agent Card",
    desc: "When someone taps the card, they can talk to an AI voice agent that answers questions about the business, services, pricing, availability, or next steps.",
    example: "A realtor's NFC card opens a voice agent that asks whether the visitor is buying, selling, or renting, then captures the lead.",
  },
  {
    id: "calendar",
    letter: "B",
    title: "AI Calendar Agent",
    desc: "The card opens a smart scheduling assistant that helps the visitor book an appointment, consultation, showing, meeting, demo, or event slot.",
    example: "A consultant taps their card at a networking event. The visitor chooses a meeting time and gets an automatic confirmation.",
  },
  {
    id: "sales",
    letter: "C",
    title: "AI Sales Assistant",
    desc: "The card opens an AI chat assistant that qualifies the lead, answers product questions, recommends services, and sends the lead to the correct offer.",
    example: "A software company uses the card to qualify prospects by budget, timeline, and business need.",
  },
  {
    id: "faq",
    letter: "D",
    title: "AI FAQ Agent",
    desc: "The card answers common questions 24/7.",
    example: "A gym trainer's card answers questions about pricing, schedule, meal plans, location, and first-session requirements.",
  },
  {
    id: "brand",
    letter: "E",
    title: "AI Personal Brand Assistant",
    desc: "The card acts like a personal digital representative for speakers, founders, creators, and executives.",
    example: "A public speaker's card shares bio, speaking topics, press kit, booking form, and answers event organizer questions.",
  },
  {
    id: "restaurant",
    letter: "F",
    title: "AI Restaurant/Bar Host",
    desc: "The card opens a restaurant or bar assistant that can show menu items, specials, reservations, directions, events, and private booking info.",
    example: "A bartender gives out a card that lets customers ask about happy hour, events, and reservations.",
  },
  {
    id: "events",
    letter: "G",
    title: "AI Event Networking Agent",
    desc: "The card captures who the visitor is, what they are interested in, and sends a personalized follow-up after an event.",
    example: "At a trade show, visitors tap the card, choose what product they care about, and receive a custom follow-up email.",
  },
  {
    id: "recruiter",
    letter: "H",
    title: "AI Recruiter/Resume Agent",
    desc: "The card acts as an interactive resume and portfolio.",
    example: "A job seeker's card lets recruiters ask about skills, projects, experience, certifications, and availability.",
  },
  {
    id: "realestate",
    letter: "I",
    title: "AI Real Estate Agent",
    desc: "The card captures buyer/seller leads, answers property questions, shares listings, books showings, and sends follow-up links.",
    example: "Visitors tap to indicate buying or selling interest and receive curated listings.",
  },
  {
    id: "service",
    letter: "J",
    title: "AI Service Business Agent",
    desc: "For barbers, contractors, photographers, cleaners, trainers, and consultants. Answers service questions, provides quotes, and routes to booking.",
    example: "A mobile mechanic's card answers service area, pricing, and availability questions.",
  },
  {
    id: "creator",
    letter: "K",
    title: "AI Creator/Fan Agent",
    desc: "For musicians, artists, DJs, streamers, and creators. Shares content, collects fan emails, sells merch, and answers fan questions.",
    example: "A DJ's card shares latest mixes, upcoming events, and merch links while collecting fan emails.",
  },
  {
    id: "intake",
    letter: "L",
    title: "AI Customer Intake Agent",
    desc: "The card starts a guided intake form using chat.",
    example: "A legal consultant uses the card to collect the right information before the first call.",
  },
  {
    id: "followup",
    letter: "M",
    title: "AI Follow-Up Agent",
    desc: "After someone taps the card, the system can send a personalized follow-up message.",
    example: "Great meeting you today. Here is my portfolio and booking link.",
  },
  {
    id: "recommender",
    letter: "N",
    title: "AI Product Recommender",
    desc: "The card asks a few questions and recommends the right service, package, or product.",
    example: "A skincare brand uses the card to recommend products based on skin type and goals.",
  },
  {
    id: "workflow",
    letter: "O",
    title: "AI Internal Workflow Trigger",
    desc: "The card can trigger internal automations.",
    example: "A field technician taps a card to open a job form, send an update, create a ticket, or notify a team.",
  },
];

export default function UseCasesPage() {
  return (
    <Section className="pt-32">
      <SectionHeader
        label="AI Possibilities"
        title="What an AI-Powered NFC Card Can Do"
        subtitle="Fifteen ways The Cardologist transforms every tap into a meaningful business connection."
        centered
      />

      <div className="space-y-6 max-w-4xl mx-auto">
        {USE_CASES.map((uc) => (
          <GlassPanel key={uc.id} id={uc.id} className="p-6 md:p-8 scroll-mt-24">
            <div className="flex items-start gap-4">
              <span className="font-serif text-3xl text-bar-gold/40 shrink-0">{uc.letter}</span>
              <div>
                <h3 className="font-serif text-xl text-bar-cream mb-2">{uc.title}</h3>
                <p className="text-bar-cream/70 text-sm leading-relaxed mb-4">{uc.desc}</p>
                <div className="bg-bar-burgundy/20 rounded-xl p-4 border border-bar-gold/10">
                  <p className="text-bar-amber text-xs uppercase tracking-wider mb-1">Example</p>
                  <p className="text-bar-cream/80 text-sm italic">{uc.example}</p>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>

      <div className="text-center mt-12">
        <GoldButton href="/build" size="lg">
          Build Your AI Card
        </GoldButton>
      </div>
    </Section>
  );
}
