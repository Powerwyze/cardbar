"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { CardologistAvatar } from "./CardologistAvatar";
import { CARDOLOGIST_WELCOME, QUICK_REPLIES } from "@/lib/cardologist/prompt";
import { useBuilderStore } from "@/lib/builder/store";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: CARDOLOGIST_WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const builderState = useBuilderStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/cardologist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          builderContext: {
            step: builderState.step,
            cardType: builderState.cardType,
            selectedTemplate: builderState.selectedTemplate,
            selectedAutomations: builderState.selectedAutomations,
            aiAddonEnabled: builderState.aiAddonEnabled,
            designStyle: builderState.designStyle,
          },
        }),
      });

      const contentType = res.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            assistantContent += decoder.decode(value, { stream: true });
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: assistantContent };
              return updated;
            });
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getFallbackResponse(text) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm"
          >
            <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-bar-gold/20">
              <div className="flex items-center justify-between p-4 border-b border-bar-gold/10 bg-bar-burgundy/20">
                <div className="flex items-center gap-3">
                  <CardologistAvatar size={36} />
                  <div>
                    <p className="text-bar-cream text-sm font-medium">The Cardologist</p>
                    <p className="text-bar-amber/60 text-xs">Your card concierge</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-bar-cream/50 hover:text-bar-cream p-1">
                  <X size={18} />
                </button>
              </div>

              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-bar-gold/15 border border-bar-gold/20 text-bar-cream rounded-tr-sm"
                          : "bg-bar-burgundy/25 text-bar-cream/90 rounded-tl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex gap-1 px-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-bar-amber/60"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {QUICK_REPLIES.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-bar-gold/30 text-bar-cream/70 hover:border-bar-gold hover:text-bar-gold transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="p-4 border-t border-bar-gold/10 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask The Cardologist..."
                  className="flex-1 bg-bar-charcoal/50 border border-bar-smoke rounded-full px-4 py-2 text-sm text-bar-cream placeholder:text-bar-cream/30 focus:outline-none focus:border-bar-gold/50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-bar-gold to-bar-amber flex items-center justify-center text-bar-black hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-bar-gold to-bar-amber shadow-lg flex items-center justify-center text-bar-black amber-glow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Cardologist chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </>
  );
}

function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("realtor") || lower.includes("real estate")) {
    return "For real estate, I'd recommend The Lead Generator template with CRM handoff and appointment booking. The Reserve Pour metal card makes a strong first impression. Want me to walk you through the build?";
  }
  if (lower.includes("lead") || lower.includes("capture")) {
    return "That automation has a strong lead-capture finish. I'd suggest The Lead Generator template with SMS follow-up and CRM integration. Shall we start mixing your card?";
  }
  if (lower.includes("appointment") || lower.includes("book")) {
    return "The Appointment Setter template is perfect for booking. Pair it with calendar automation and automatic confirmations. Would you like that served with AI?";
  }
  if (lower.includes("restaurant") || lower.includes("bar")) {
    return "The Restaurant/Bar Card template handles menus, reservations, and SMS signups beautifully. Let's mix your signature card — head to the builder to get started.";
  }
  if (lower.includes("ai") || lower.includes("cardologist")) {
    return "The AI add-on ($10/month) puts me directly on your card — answering questions, booking meetings, and capturing leads 24/7. It's the ultimate garnish for your NFC card.";
  }
  if (lower.includes("pric")) {
    return "Basic Card is $30, Metal is $50, plus $5/month hosting (required) and optional $10/month AI add-on. Every card includes a landing page, automations, and 24-hour build & ship.";
  }
  return "That's a smooth choice. Let's mix your signature card — visit the builder to choose your pour, craft your label, and tell me what should happen after every tap.";
}
