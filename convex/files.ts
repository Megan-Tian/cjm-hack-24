import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveFileId = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    // Here you can save the file ID to your database if needed
    // For example:
    // await ctx.db.insert("files", { storageId: args.storageId });
    console.log("File saved with ID:", args.storageId);
  },
});