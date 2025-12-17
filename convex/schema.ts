// convex/schema.ts
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    authId: v.string(),
    createdAt: v.number(),
  }).index("byAuthId", ["authId"]),  

  sessions: defineTable({
    userId: v.id("users"),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
  }).index("byUserId", ["userId"]),

  messages: defineTable({
    sessionId: v.id("sessions"),
    role: v.union(v.literal("user"), v.literal("rose")),
    content: v.string(),
    createdAt: v.number(),
  }).index("bySessionId", ["sessionId"]),

  memories: defineTable({
    userId: v.id("users"),
    content: v.string(),
    embedding: v.array(v.number()),
    type: v.union(
      v.literal("episodic"),
      v.literal("semantic"),
      v.literal("emotional")
    ),
    importance: v.number(),
    createdAt: v.number(),
  }).index("byUserId", ["userId"]),
})