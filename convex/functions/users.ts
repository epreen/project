// convex/functions/users.ts
import { mutation, query } from "../_generated/server"
import { v } from "convex/values"

// Get user by authId
export const byAuthId = query({
    args: { authId: v.string() },
    handler: async (ctx, { authId }) => {
      return await ctx.db
        .query("users")
        .filter(q => q.eq(q.field("authId"), authId))
        .collect();
    },
});
  
  // Insert a new user
export const insert = mutation({
    args: { authId: v.string(), createdAt: v.number() },
    handler: async (ctx, { authId, createdAt }) => {
      return await ctx.db.insert("users", { authId, createdAt });
    },
});