import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { CARDOLOGIST_SYSTEM_PROMPT } from "@/lib/cardologist/prompt";

export const maxDuration = 30;

function getModel() {
  const provider = process.env.LLM_PROVIDER ?? "openai";
  if (provider === "anthropic" && process.env.ANTHROPIC_API_KEY) {
    const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    return anthropic("claude-sonnet-4-20250514");
  }
  const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openai("gpt-4o-mini");
}

function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("realtor") || lower.includes("real estate")) {
    return "For real estate, I'd recommend The Lead Generator template with CRM handoff and appointment booking. The Reserve Pour metal card makes a strong first impression.";
  }
  if (lower.includes("lead")) {
    return "That automation has a strong lead-capture finish. I'd suggest The Lead Generator template with SMS follow-up and CRM integration.";
  }
  if (lower.includes("ai")) {
    return "The AI add-on ($10/month) puts me directly on your card — answering questions, booking meetings, and capturing leads 24/7.";
  }
  if (lower.includes("pric")) {
    return "Basic Card is $30, Metal is $50, plus $5/month hosting (required) and optional $10/month AI add-on.";
  }
  return "That's a smooth choice. Let's mix your signature card — visit the builder to get started.";
}

export async function POST(req: Request) {
  const { messages, builderContext } = await req.json();

  const contextNote = builderContext
    ? `\n\nCurrent builder context: Step ${builderContext.step}, Card type: ${builderContext.cardType ?? "not selected"}, Template: ${builderContext.selectedTemplate ?? "not selected"}, Automations: ${builderContext.selectedAutomations?.join(", ") || "none"}, AI add-on: ${builderContext.aiAddonEnabled ? "yes" : "no"}, Design style: ${builderContext.designStyle ?? "not selected"}.`
    : "";

  if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    const lastMessage = messages[messages.length - 1]?.content ?? "";
    return Response.json({ content: getFallbackResponse(lastMessage) });
  }

  const result = streamText({
    model: getModel(),
    system: CARDOLOGIST_SYSTEM_PROMPT + contextNote,
    messages,
    maxOutputTokens: 500,
  });

  return result.toTextStreamResponse();
}
