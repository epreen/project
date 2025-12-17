// oc/rose/formats.ts
export function formatDialogue(
    messages: { role: string; content: string }[]
  ) {
    return messages
      .map((m) =>
        m.role === "user"
          ? `User: ${m.content}`
          : `Rose: ${m.content}`
      )
      .join("\n")
}

export function formatBubbleText(
  content: string,
  role: "user" | "rose"
) {
  if (role === "rose") {
    return content
      .replace(/\s{2,}/g, " ")
      .trim()
  }

  return content.trim()
}
