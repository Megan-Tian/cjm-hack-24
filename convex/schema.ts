import { defineSchema, defineTable, s } from 'convex/schema';

export const schema = defineSchema({
 resumes: defineTable({
   text: s.string(),
   embedding: s.array(s.number()),
   metadata: s.object({
     name: s.string(),
     email: s.string(),
     skills: s.array(s.string()),
     experience: s.optional(s.array(s.object({
       company: s.string(),
       role: s.string(),
       years: s.number(),
     }))),
   }),
   uploadedAt: s.date(),
 }),

 companies: defineTable({
   company: s.string(), // company name
   website: s.string(), // to careers page or main page?
   roles: s.array(s.string()), // might be just s.string()? also are typescript arrays fixes length or?
   industry: s.string(),
   about: s.string(), // blurb
   values: s.array(s.string()),
   skills: s.array(s.string()),
 }),
});