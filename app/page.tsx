"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSession } from "@/lib/auth-client"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

import {
  RoseState,
  ROSE_STATE_LABELS,
  nextIdleDelay,
} from "@/oc/rose/presence"
import { RoseMessageBubble, RoseTypingBubble } from "@/oc/rose/rose-bubble"
import { UserBubble } from "@/oc/user-bubble"

export default function RoseUI() {
  const { status } = useSession()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "rose"; content: string }[]>([])
  const [roseState, setRoseState] = useState<RoseState>("idle")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Ambient bouncing using GSAP
  useEffect(() => {
    const glows = [
      {
        el: document.getElementById("glow-a"),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0.25,
        vy: 0.18,
      },
      {
        el: document.getElementById("glow-b"),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: -0.22,
        vy: 0.2,
      },
    ]
  
    const radius = 180
    const speedLimit = 0.58
  
    gsap.ticker.add(() => {
      const w = window.innerWidth
      const h = window.innerHeight
  
      glows.forEach((g) => {
        g.x += g.vx
        g.y += g.vy
  
        // Wall bounce
        if (g.x <= 0 || g.x >= w - radius) g.vx *= -1
        if (g.y <= 0 || g.y >= h - radius) g.vy *= -1
      })
  
      // Glow-to-glow interaction (soft repulsion)
      const dx = glows[0].x - glows[1].x
      const dy = glows[0].y - glows[1].y
      const dist = Math.sqrt(dx * dx + dy * dy)
  
      if (dist < radius * 1.2) {
        const force = (radius * 1.2 - dist) / (radius * 1.2)
        const fx = (dx / dist) * force * 0.02
        const fy = (dy / dist) * force * 0.02
  
        glows[0].vx += fx
        glows[0].vy += fy
        glows[1].vx -= fx
        glows[1].vy -= fy
      }
  
      // Clamp speeds (keeps it ambient)
      glows.forEach((g) => {
        g.vx = Math.max(-speedLimit, Math.min(speedLimit, g.vx))
        g.vy = Math.max(-speedLimit, Math.min(speedLimit, g.vy))
  
        gsap.set(g.el, {
          x: g.x,
          y: g.y,
        })
      })
    })
  
    return () => {
      gsap.ticker.remove(() => {})
    }
  }, [])  

  // Auto scroll to latest message smoothly
  useEffect(() => {
    const container = chatContainerRef.current
    if (container) {
      // Wait for DOM updates to finish
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth", // Smooth scrolling
        })
      })
    }
  }, [messages])

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      setSessionId(null)
      setMessages([])
      setRoseState("idle")
      await signOut({ callbackUrl: "/login" })
    }
  }

  async function sendMessage() {
    if (!input.trim()) return
    const userMessage = input
    setInput("")
    setMessages((m) => [...m, { role: "user", content: userMessage }])
    setRoseState("thinking")

    const res = await fetch("/api/oc/think", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, sessionId }),
    })
    if (!res.ok) return
    const result = await res.json()
    setSessionId(result.sessionId)
    setMessages((m) => [...m, { role: "rose", content: result.reply }])
    setRoseState("responding")
    setTimeout(() => setRoseState("idle"), nextIdleDelay("responding"))
  }

  if (status === "loading") {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Waking Rose…
      </div>
    )
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* ambient glow */}
      <div className="absolute h-96 w-96 inset-0 pointer-events-none overflow-hidden rounded-full blur-3xl">
        <div
          id="glow-a"
          className="absolute h-96 w-96 rounded-full bg-primary/50 blur-3xl"
        />
        <div
          id="glow-b"
          className="absolute h-96 w-96 rounded-full bg-rose-500/50 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="relative max-w-lg min-w-md backdrop-blur-2xl bg-background/70 flex flex-col max-h-[700px] min-h-[540px]">
          {/* Sticky Header */}
          <CardHeader className="sticky min-h-fit top-0 z-10 flex items-start justify-between w-full py-4 px-6 bg-background/90 backdrop-blur-xs">
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold tracking-wide text-primary/50">Rose</h1>
              <Presence state={roseState} />
            </div>
            <Indicator state={roseState} />
          </CardHeader>

          {/* Scrollable Chat Content */}
          <CardContent
            ref={chatContainerRef}
            className="flex-1 flex flex-col gap-3 px-6 py-4 min-h-fit overflow-y-auto"
          >
            <AnimatePresence>
              {messages.map((m, i) =>
                m.role === "rose" ? <RoseMessageBubble key={i} content={m.content} /> : <UserBubble key={i} content={m.content} />
              )}
              {roseState === "thinking" && <RoseTypingBubble />}
            </AnimatePresence>
          </CardContent>

          {/* Sticky Footer */}
          <CardFooter className="sticky min-h-fit bottom-0 z-10 py-4 px-6 flex gap-2 items-center bg-background/70 backdrop-blur-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:text-foreground p-2"
            >
              <LogOut className="h-5 w-5" />
            </Button>

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Speak carefully. Rose is listening."
              onFocus={() => setRoseState("listening")}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage()
              }}
              className="flex-1 bg-background/30 px-4 py-2 placeholder:text-muted-foreground focus:ring-1 focus:outline-none"
            />
            <Button
              onClick={sendMessage}
              className="bg-accent hover:bg-accent/80 text-accent-foreground px-4 py-2"
            >
              Send
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

function Indicator({ state }: { state: RoseState }) {
  return (
    <motion.div key={state} initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 text-xs text-muted-foreground">
      <span className={`w-2 h-2 rounded-full ${
        state === "listening" ? "bg-green-400" : state === "thinking" ? "bg-yellow-400" : "bg-gray-400"
      }`} />
    </motion.div>
  )
}

function Presence({ state }: { state: RoseState }) {
  return (
    <motion.p key={state} initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 text-xs text-muted-foreground">
      {ROSE_STATE_LABELS[state]}
    </motion.p>
  )
}