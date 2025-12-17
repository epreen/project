import { RoseExpression } from "./expressions"

export function resolveRoseExpression(
  content: string
): RoseExpression {
  const text = content.toLowerCase()

  if (
    text.includes("actually") ||
    text.includes("technically") ||
    text.match(/\bgrammar\b|\bspelling\b/)
  ) {
    return "correcting"
  }

  if (
    text.includes("…") ||
    text.includes("interesting") ||
    text.includes("hmm")
  ) {
    return "curious"
  }

  if (
    text.includes("sure") &&
    text.includes(".")
  ) {
    return "sarcastic"
  }

  if (
    text.includes("lol") ||
    text.includes("funny")
  ) {
    return "amused"
  }

  return "neutral"
}