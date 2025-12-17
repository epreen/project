// oc/rose/presence.ts

export type RoseState =
  | "idle"
  | "listening"
  | "thinking"
  | "responding"
  | "reflecting"

export const ROSE_STATE_LABELS: Record<RoseState, string> = {
  idle: "Idle",
  listening: "Listening",
  thinking: "Thinking",
  responding: "Responding",
  reflecting: "Reflecting",
}

export function nextIdleDelay(state: RoseState) {
  switch (state) {
    case "responding":
      return 800
    case "thinking":
      return 1200
    default:
      return 500
  }
}