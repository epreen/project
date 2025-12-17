export function computeTypingDuration(text: string) {
    const base = 600
    const perChar = 18
  
    return Math.min(
      2400,
      base + text.length * perChar
    )
}  