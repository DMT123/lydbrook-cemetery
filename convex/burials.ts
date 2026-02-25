import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    section: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { section, limit = 500 } = args;

    if (section) {
      return await ctx.db
        .query("burials")
        .withIndex("by_section", (q) => q.eq("section", section))
        .take(limit);
    }

    return await ctx.db.query("burials").take(limit);
  },
});

export const getById = query({
  args: { id: v.id("burials") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByPlot = query({
  args: { plot: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("burials")
      .withIndex("by_plot", (q) => q.eq("plot", args.plot))
      .collect();
  },
});

export const search = query({
  args: {
    searchTerm: v.string(),
    section: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.searchTerm.trim()) {
      return [];
    }

    let searchQuery = ctx.db
      .query("burials")
      .withSearchIndex("search_name", (q) => {
        let sq = q.search("surname", args.searchTerm);
        if (args.section) {
          sq = sq.eq("section", args.section);
        }
        return sq;
      });

    return await searchQuery.take(50);
  },
});

export const searchAll = query({
  args: {
    term: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.term.trim()) {
      return [];
    }

    const byName = await ctx.db
      .query("burials")
      .withSearchIndex("search_name", (q) => q.search("surname", args.term))
      .take(50);

    return byName;
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("burials").collect();
    const plots = await ctx.db.query("plots").collect();

    const sections = new Set(all.map((b) => b.section).filter(Boolean));
    const years = all
      .map((b) => b.yearOfDeath)
      .filter((y): y is number => y !== undefined && y > 0);
    const earliestYear = years.length > 0 ? Math.min(...years) : null;
    const latestYear = years.length > 0 ? Math.max(...years) : null;

    return {
      totalBurials: all.length,
      totalPlots: plots.length,
      totalSections: sections.size,
      earliestYear,
      latestYear,
      sections: Array.from(sections).sort(),
    };
  },
});

export const getBySurname = query({
  args: { surname: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("burials")
      .withIndex("by_surname", (q) => q.eq("surname", args.surname))
      .collect();
  },
});

export const create = mutation({
  args: {
    surname: v.string(),
    givenName: v.string(),
    middleNames: v.optional(v.string()),
    ageAtDeath: v.optional(v.number()),
    agePeriod: v.optional(v.string()),
    dayOfDeath: v.optional(v.number()),
    monthOfDeath: v.optional(v.string()),
    yearOfDeath: v.optional(v.number()),
    placeOfDeath: v.optional(v.string()),
    homeAddress: v.optional(v.string()),
    sourceOfEvidence: v.optional(v.string()),
    certificateNumber: v.optional(v.string()),
    notes: v.optional(v.string()),
    plot: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const section = args.plot
      ? args.plot.replace(/[0-9]/g, "").trim()
      : undefined;
    const plotNumber = args.plot
      ? parseInt(args.plot.replace(/[^0-9]/g, ""), 10) || undefined
      : undefined;

    const dateOfDeath =
      args.yearOfDeath && args.monthOfDeath && args.dayOfDeath
        ? `${args.monthOfDeath} ${args.dayOfDeath}, ${args.yearOfDeath}`
        : args.yearOfDeath
          ? `${args.yearOfDeath}`
          : undefined;

    const id = await ctx.db.insert("burials", {
      surname: args.surname,
      givenName: args.givenName,
      middleNames: args.middleNames,
      ageAtDeath: args.ageAtDeath,
      agePeriod: args.agePeriod || "Years",
      dateOfDeath,
      dayOfDeath: args.dayOfDeath,
      monthOfDeath: args.monthOfDeath,
      yearOfDeath: args.yearOfDeath,
      placeOfDeath: args.placeOfDeath,
      homeAddress: args.homeAddress,
      sourceOfEvidence: args.sourceOfEvidence,
      certificateNumber: args.certificateNumber,
      notes: args.notes,
      plot: args.plot,
      section,
      plotNumber,
      sourceDatabase: "user_added",
    });

    if (args.plot && section && plotNumber) {
      const existingPlot = await ctx.db
        .query("plots")
        .withIndex("by_plotId", (q) => q.eq("plotId", args.plot!))
        .unique();

      if (existingPlot) {
        await ctx.db.patch(existingPlot._id, {
          occupants: existingPlot.occupants + 1,
        });
      } else {
        await ctx.db.insert("plots", {
          plotId: args.plot,
          section,
          plotNumber,
          occupants: 1,
        });
      }
    }

    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("burials"),
    surname: v.optional(v.string()),
    givenName: v.optional(v.string()),
    middleNames: v.optional(v.string()),
    ageAtDeath: v.optional(v.number()),
    agePeriod: v.optional(v.string()),
    dayOfDeath: v.optional(v.number()),
    monthOfDeath: v.optional(v.string()),
    yearOfDeath: v.optional(v.number()),
    placeOfDeath: v.optional(v.string()),
    homeAddress: v.optional(v.string()),
    sourceOfEvidence: v.optional(v.string()),
    certificateNumber: v.optional(v.string()),
    notes: v.optional(v.string()),
    plot: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Burial record not found");

    const patch: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    if (updates.plot) {
      patch.section = updates.plot.replace(/[0-9]/g, "").trim();
      patch.plotNumber =
        parseInt(updates.plot.replace(/[^0-9]/g, ""), 10) || undefined;
    }

    await ctx.db.patch(id, patch);
  },
});

export const seed = mutation({
  args: {
    records: v.array(
      v.object({
        surname: v.string(),
        givenName: v.string(),
        middleNames: v.optional(v.string()),
        ageAtDeath: v.optional(v.number()),
        agePeriod: v.optional(v.string()),
        dateOfDeath: v.optional(v.string()),
        dayOfDeath: v.optional(v.number()),
        monthOfDeath: v.optional(v.string()),
        yearOfDeath: v.optional(v.number()),
        placeOfDeath: v.optional(v.string()),
        homeAddress: v.optional(v.string()),
        sourceOfEvidence: v.optional(v.string()),
        recordDate: v.optional(v.string()),
        certificateNumber: v.optional(v.string()),
        notes: v.optional(v.string()),
        plot: v.optional(v.string()),
        section: v.optional(v.string()),
        plotNumber: v.optional(v.number()),
        sourceDatabase: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    for (const record of args.records) {
      await ctx.db.insert("burials", record);
    }
    return args.records.length;
  },
});

export const seedPlots = mutation({
  args: {
    plots: v.array(
      v.object({
        plotId: v.string(),
        section: v.string(),
        plotNumber: v.number(),
        occupants: v.number(),
        summaryText: v.optional(v.string()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    for (const plot of args.plots) {
      await ctx.db.insert("plots", plot);
    }
    return args.plots.length;
  },
});
