"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth-client"
import { Github, Chrome } from "lucide-react"
import { useEffect } from "react"
import gsap from "gsap"

export default function LoginPage() {
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

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
        <Card className="relative w-[420px] backdrop-blur-xl bg-background/80 border-muted">
          <CardHeader className="space-y-2 text-center p-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Rose remembers patterns. Not passwords.
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 mt-2">
            <Button
              variant="default"
              size="lg"
              className="w-full gap-2"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <Chrome className="h-5 w-5" />
              Continue with Google
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed p-4">
              By entering, you allow Rose to learn from conversation,
              context, and continuity.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
