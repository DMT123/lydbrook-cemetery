import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Generate an upload URL for Convex file storage.
 * The client uploads the file directly to this URL, then gets back a storageId.
 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Link an uploaded scanned document to a burial record.
 */
export const linkDocumentToBurial = mutation({
  args: {
    burialId: v.id("burials"),
    storageId: v.id("_storage"),
    filename: v.string(),
  },
  handler: async (ctx, args) => {
    const burial = await ctx.db.get(args.burialId);
    if (!burial) throw new Error("Burial record not found");

    await ctx.db.patch(args.burialId, {
      scannedDocumentStorageId: args.storageId,
      scannedDocumentFilename: args.filename,
    });
  },
});

/**
 * Get the URL for a scanned document by burial ID.
 */
export const getDocumentUrl = query({
  args: { burialId: v.id("burials") },
  handler: async (ctx, args) => {
    const burial = await ctx.db.get(args.burialId);
    if (!burial?.scannedDocumentStorageId) return null;

    const url = await ctx.storage.getUrl(burial.scannedDocumentStorageId);
    return {
      url,
      filename: burial.scannedDocumentFilename ?? "document.jpg",
    };
  },
});

/**
 * Find a burial record by name match (for the upload script).
 */
export const findBurialByName = query({
  args: {
    surname: v.string(),
    givenName: v.string(),
    yearOfDeath: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Search by surname first
    const candidates = await ctx.db
      .query("burials")
      .withIndex("by_surname", (q) => q.eq("surname", args.surname))
      .collect();

    // Filter by given name
    const matches = candidates.filter((b) => {
      const nameMatch =
        b.givenName.toLowerCase() === args.givenName.toLowerCase();
      if (!nameMatch) return false;
      if (args.yearOfDeath && b.yearOfDeath) {
        return b.yearOfDeath === args.yearOfDeath;
      }
      return true;
    });

    return matches.length > 0 ? matches[0] : null;
  },
});

/**
 * Get counts of records with and without scanned documents.
 */
export const getDocumentStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("burials").collect();
    const withDocs = all.filter((b) => b.scannedDocumentStorageId).length;
    return {
      total: all.length,
      withDocuments: withDocs,
      withoutDocuments: all.length - withDocs,
    };
  },
});
