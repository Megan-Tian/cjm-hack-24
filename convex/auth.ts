import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleCredential = mutation({
  args: { credential: v.string() },
  handler: async (ctx, args) => {
    const ticket = await client.verifyIdToken({
      idToken: args.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid credential");
    }
    
    // Here you can create or update a user in your Convex database
    // For example:
    // const user = await ctx.db.insert("users", {
    //   name: payload.name,
    //   email: payload.email,
    //   googleId: payload.sub,
    // });

    return {
      name: payload.name,
      email: payload.email,
      // Add any other user info you want to return
    };
  },
});