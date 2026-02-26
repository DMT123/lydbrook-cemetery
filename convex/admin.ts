import { query, mutation, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const getAdminByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("admins")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();
  },
});

export const getAdminByUsernameInternal = internalQuery({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("admins")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();
  },
});

export const createSession = internalMutation({
  args: {
    adminId: v.id("admins"),
    token: v.string(),
    expiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("sessions", args);
  },
});

export const insertAdmin = internalMutation({
  args: {
    username: v.string(),
    passwordHash: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("admins", args);
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

export const verifySession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!args.token) return null;

    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    const admin = await ctx.db.get(session.adminId);
    if (!admin) return null;

    return { username: admin.username, adminId: admin._id };
  },
});
