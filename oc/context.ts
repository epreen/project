// oc/context.ts
import { convex } from "@/lib/convex"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

export async function getRecentSessionContext({
  sessionId,
  limit = 6,
}: {
  sessionId: Id<"sessions">
  limit?: number
}) {
  return convex.query(api.functions.messages.bySessionId, {
    sessionId,
    limit,
  })
}