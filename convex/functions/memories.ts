// convex/functions/memories.ts
import { query } from "../_generated/server"
import { v } from "convex/values"

export const byUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("memories")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .collect()
  },
})