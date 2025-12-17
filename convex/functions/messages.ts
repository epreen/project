// convex/functions/messages.ts
import { mutation, query } from "../_generated/server"
import { v } from "convex/values"

export const bySessionId = query({
    args: {
      sessionId: v.id("sessions"),
      limit: v.optional(v.number()),
    },
    handler: async (ctx, { sessionId, limit }) => {
      const q = ctx.db
        .query("messages")
        .filter((q) => q.eq(q.field("sessionId"), sessionId))
        .order("desc")
  
      const messages = limit ? await q.take(limit) : await q.collect()
  
      return messages.reverse() // chronological order for prompting
    },
})

export const insert = mutation({
    args: {
      sessionId: v.id("sessions"),
      role: v.union(v.literal("user"), v.literal("rose")),
      content: v.string(),
    },
    handler: async (ctx, { sessionId, role, content }) => {
      return await ctx.db.insert("messages", {
        sessionId,
        role,
        content,
        createdAt: Date.now(),
      })
    },
})