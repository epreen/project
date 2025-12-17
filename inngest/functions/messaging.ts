// inngest/functions/messaging.ts
import { inngest } from "../client"

export const onMessage = inngest.createFunction(
  { id: "rose-on-message" },
  { event: "rose/message.received" },
  async ({ event, step }) => {
    const { userId, sessionId, message } = event.data

    await step.run("thinking", async () => {
      // optional: emit websocket presence = "thinking"
    })

    await step.sleep("cognitive-delay", "2s")

    await step.run("reflect-later", async () => {
      // enqueue reflection or memory importance scoring
    })
  }
)