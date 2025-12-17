"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession } from "@/lib/auth-client"

import {
  RoseState,
  ROSE_STATE_LABELS,
  nextIdleDelay,
} from "@/oc/rose/presence"
import { initRoseAmbient } from "@/oc/rose/animations"
import { RoseMessageBubble, RoseTypingBubble } from "@/oc/rose/rose-bubble"
import { UserBubble } from "@/oc/user-bubble"

export default function RoseUI() {
  const { status } = useSession()

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<
    { role: "user" | "rose"; content: string }[]
  >([])
  const [roseState, setRoseState] =
    useState<RoseState>("idle")

  useEffect(() => {
    initRoseAmbient()
  }, [])

  async function sendMessage() {
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setMessages((m) => [
      ...m,
      { role: "user", content: userMessage },
    ])
    setRoseState("thinking")

    const res = await fetch("/api/oc/think", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, sessionId }),
    })
    
    if (!res.ok) return
    
    const result = await res.json()
    setSessionId(result.sessionId); // store in state for reuse    

    setMessages((m) => [
      ...m,
      { role: "rose", content: result.reply },
    ])
    setRoseState("responding")

    setTimeout(
      () => setRoseState("idle"),
      nextIdleDelay("responding")
    )
  }

  if (status === "loading") {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Waking Rose…
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background">
      <Card className="max-w-lg rounded-xl shadow-2xl bg-background/70 backdrop-blur-md border border-border/20 max-h-[700px] min-h-[540px] flex flex-col">
      <CardHeader className="flex items-center justify-between py-4 px-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-wide text-primary/40">
            Rose
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            ORINGINAL CHARACTER
          </p>
        </div>
        <PresenceIndicator state={roseState} />
      </CardHeader>

        <CardContent className="flex flex-col gap-4 px-6 overflow-y-auto min-h-[400px]">
          <div className="flex-1 space-y-3 overflow-y-auto">
            <AnimatePresence>
            {messages.map((m, i) =>
              m.role === "rose" ? (
                <RoseMessageBubble
                  key={i}
                  content={m.content}
                />
              ) : (
                <UserBubble
                  key={i}
                  content={m.content}
                />
              )
            )}
            {roseState === "thinking" && (
              <RoseTypingBubble />
            )}
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter className="py-4 px-6 flex gap-2 items-center bg-background/20 rounded-2xl">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak carefully. Rose is listening."
            onFocus={() => setRoseState("listening")}
            className="flex-1 bg-background/30 border border-border/30 px-4 py-2 placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <Button
            onClick={sendMessage}
            className="bg-accent hover:bg-accent/80 text-accent-foreground px-4 py-2"
          >
            Send
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function PresenceIndicator({
  state,
}: {
  state: RoseState
}) {
  return (
    <motion.div
      key={state}
      initial={{ opacity: 0, y: -2 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 text-xs text-muted-foreground"
    >
      <span
        className={`w-2 h-2 rounded-full ${
          state === "listening"
            ? "bg-green-400"
            : state === "thinking"
            ? "bg-yellow-400"
            : "bg-gray-400"
        }`}
      />
      {ROSE_STATE_LABELS[state]}
    </motion.div>
  )
}