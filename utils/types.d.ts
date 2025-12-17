type AgentState =
  | "idle"
  | "listening"
  | "thinking"
  | "responding"
  | "reflecting"

  type CommandIntent = {
    intent: "open_app" | "read_file" | "search_web"
    target: string
    justification: string
    confidence: number
  }