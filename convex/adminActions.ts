"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export const login = action({
  args: {
    username: v.string(),
    password: v.string(),
  },
  returns: v.object({
    token: v.string(),
    username: v.string(),
  }),
  handler: async (ctx, args): Promise<{ token: string; username: string }> => {
    const admin = await ctx.runQuery(internal.admin.getAdminByUsernameInternal, {
      username: args.username,
    });

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const hash = hashPassword(args.password);
    if (hash !== admin.passwordHash) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await ctx.runMutation(internal.admin.createSession, {
      adminId: admin._id,
      token,
      expiresAt,
    });

    return { token, username: admin.username };
  },
});

export const seedAdmin = action({
  args: {
    username: v.string(),
    password: v.string(),
  },
  returns: v.object({
    message: v.string(),
    username: v.string(),
  }),
  handler: async (ctx, args): Promise<{ message: string; username: string }> => {
    const existing = await ctx.runQuery(internal.admin.getAdminByUsernameInternal, {
      username: args.username,
    });

    if (existing) {
      return { message: "Admin already exists", username: args.username };
    }

    const passwordHash = hashPassword(args.password);
    await ctx.runMutation(internal.admin.insertAdmin, {
      username: args.username,
      passwordHash,
      createdAt: Date.now(),
    });

    return { message: "Admin created", username: args.username };
  },
});
