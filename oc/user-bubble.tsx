import { motion } from "framer-motion"

export function UserBubble({
  content,
}: {
  content: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="ml-auto max-w-[80%] w-fit rounded-xl rounded-br-none bg-primary px-4 py-2 text-sm text-primary-foreground"
    >
      {content}
    </motion.div>
  )
}