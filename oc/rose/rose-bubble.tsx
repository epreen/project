import { motion } from "framer-motion"
import { ROSE_EXPRESSIONS } from "@/oc/rose/expressions"
import { resolveRoseExpression } from "@/oc/rose/expression-resolver"
import { formatBubbleText } from "@/oc/rose/formats"
import { Loader2 } from "lucide-react"

export function RoseMessageBubble({
  content,
}: {
  content: string
}) {
  const expression =
    resolveRoseExpression(content)

  const meta =
    ROSE_EXPRESSIONS[expression]

  const Icon = meta.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mr-auto max-w-[80%] rounded-xl rounded-bl-none w-fit h-fit bg-muted px-4 py-3 text-sm"
    >
      {meta.placement === "inside" && (
        <Icon
          className={`absolute top-2 right-2 h-4 w-4 ${meta.color}`}
        />
      )}

      <div className="pr-6">
        {formatBubbleText(
          content,
          "rose"
        )}
      </div>

      {meta.placement === "outside" && (
        <Icon
          className={`absolute -left-6 top-3 h-4 w-4 ${meta.color}`}
        />
      )}
    </motion.div>
  )
}

export function RoseTypingBubble() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mr-auto w-fit rounded-xl bg-muted px-4 py-2 text-sm text-muted-foreground flex items-center gap-2"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
      </motion.div>
    )
  }