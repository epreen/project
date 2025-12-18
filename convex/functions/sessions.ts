import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const byUserId = query({
    args: { userId: v.id("users") },
    handler: async (ctx, { userId }) => {
      return await ctx.db
        .query("sessions")
        .withIndex("byUserId", q => q.eq("userId", userId))
        .collect();
    },
});

// Insert a session
export const insert = mutation({
    args: { userId: v.id("users"), startedAt: v.number() },
    handler: async (ctx, { userId, startedAt }) => {
        return await ctx.db.insert("sessions", { userId, startedAt });
    },
});

// End a session
export const end = mutation({
    args: {
      sessionId: v.id("sessions"),
      endedAt: v.number(),
    },
    handler: async (ctx, { sessionId, endedAt }) => {
      await ctx.db.patch(sessionId, { endedAt })
    },
})