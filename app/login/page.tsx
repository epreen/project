"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth-client"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/40 to-background">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-[380px] shadow-xl">
          <CardHeader className="space-y-1">
            <h1 className="text-xl font-semibold">Welcome</h1>
            <p className="text-sm text-muted-foreground">
              Rose remembers those who return.
            </p>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <Button
              className="w-full"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              Continue with GitHub
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              By entering, you allow Rose to learn from conversation.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}