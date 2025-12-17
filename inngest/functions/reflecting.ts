// inngest/functions/reflecting.ts
import { inngest } from "../client"
import { think } from "@/oc/rose/think"

export const nightlyReflection = inngest.createFunction(
  { id: "rose-nightly-reflection" },
  { cron: "0 2 * * *" },
  async ({ step }) => {
    const users = await step.run("fetch users", async () => {
      // fetch users from Convex
      return []
    })

    for (const user of users) {
      const recentMemories = await step.run(
        "fetch recent memories",
        async () => {
          return "summarized memory context"
        }
      )

      // const reflection = await step.run(
      //   "generate reflection",
      //   async () =>
      //     think({
      //       userInput: "Reflect on today's interactions.",
      //       memoryContext: recentMemories,
      //     })
      // )

      await step.run("store semantic memory", async () => {
        // Convex insert
      })
    }
  }
)