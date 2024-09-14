import { defineSchema, defineTable } from "convex/server"; // TO fix, from template online
import { v } from "convex/values"; // TO fix, from template online

// Define a messages table with two indexes.
export const schema = defineSchema({
  messages: defineTable({
    channel: v.id("channels"),
    body: v.string(),
    user: v.id("users"),
  })
    .index("by_channel", ["channel"])
    .index("by_channel_user", ["channel", "user"]),
});