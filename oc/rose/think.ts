import { Id } from "@/convex/_generated/dataModel"
import { recallRelevantMemories } from "@/core/memory/recall"
import { cohere } from "@/lib/cohere"
import { Result } from "./types"
import { ROSE_PERSONA } from "./persona"
import { MODELS } from "@/lib/models"
import { getRecentSessionContext } from "@/oc/context"
import { formatDialogue } from "@/oc/rose/formats"
import { ROSE_EXPRESSIONS, RoseExpression } from "@/oc/rose/expressions"

export async function think({
  userId,
  sessionId,
  userInput,
}: {
  userId: Id<"users">
  sessionId: Id<"sessions">
  userInput: string
}): Promise<Result & { expression: RoseExpression }> {
  const memories = await recallRelevantMemories({
    userId,
    query: userInput,
  })

  const recentMessages = await getRecentSessionContext({ sessionId })

  const memoryContext = memories
    .map((m) => `(${m.type}) ${m.content}`)
    .join("\n")

  const dialogueContext = formatDialogue(recentMessages)

  // Provide guidance for Rose's expressions
  const expressionGuide = Object.entries(ROSE_EXPRESSIONS)
    .map(([name, e]) => `- ${name}: use when the message is ${name}`)
    .join("\n")

  const prompt = `
You are Rosarin Yung (Rose).

Persona:
${JSON.stringify(ROSE_PERSONA, null, 2)}

Conversation so far:
${dialogueContext || "This is the beginning of the conversation."}

Relevant long-term memory:
${memoryContext || "None"}

You have the following expressions you can use for each response, strictly use them:
${expressionGuide}

Guidelines:
- Respond as a thoughtful, grounded human
- Maintain conversational continuity
- Refer back naturally when relevant
- Use expressions strictly with one word: pick one that matches the tone (neutral, amused, sarcastic, correcting, curious, focused, thinking, typing)
- Never invent memories
- If unsure, acknowledge uncertainty
- Speak plainly, not theatrically

User:
${userInput}

Rose:
Respond naturally and include a suggested expression at the start of your reply, like this format:
[expression] Your message here
`.trim()

  try {
    const response = await cohere.chat({
      model: MODELS.dialogue,
      message: prompt,
      temperature: 0.55,
    })

    // Parse expression from the response
    const text = response.text ?? ""
    const expressionMatch = text.match(/^\[(\w+)\]\s*(.*)/)

    let expression: RoseExpression = "neutral"
    let reply = text

    if (expressionMatch) {
      const candidate = expressionMatch[1] as RoseExpression
      if (candidate in ROSE_EXPRESSIONS) {
        expression = candidate
        reply = expressionMatch[2] ?? ""
      }
    }

    return {
      reply,
      expression,
      recallCount: memories.length,
      confidence: Math.min(1, 0.4 + memories.length * 0.12),
    }
  } catch (err) {
    console.error("Cohere error:", err)
    return {
      reply: "Give me a second. My thoughts tangled themselves.",
      expression: "neutral",
      recallCount: memories.length,
      confidence: 0,
    }
  }
}