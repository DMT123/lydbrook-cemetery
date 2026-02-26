import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    submitterName: v.string(),
    submitterEmail: v.string(),
    burialSurname: v.string(),
    burialGivenName: v.optional(v.string()),
    burialYear: v.optional(v.string()),
    burialPlot: v.optional(v.string()),
    relationship: v.optional(v.string()),
    additionalInfo: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("submissions", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const list = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("submissions")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("submissions").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("submissions"),
    status: v.string(),
    adminNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const submission = await ctx.db.get(args.id);
    if (!submission) throw new Error("Submission not found");

    await ctx.db.patch(args.id, {
      status: args.status,
      adminNotes: args.adminNotes,
    });
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("submissions").collect();
    return {
      total: all.length,
      pending: all.filter((s) => s.status === "pending").length,
      reviewed: all.filter((s) => s.status === "reviewed").length,
      added: all.filter((s) => s.status === "added").length,
    };
  },
});
