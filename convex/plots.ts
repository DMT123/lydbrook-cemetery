import { query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    section: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.section) {
      return await ctx.db
        .query("plots")
        .withIndex("by_section", (q) => q.eq("section", args.section!))
        .collect();
    }
    return await ctx.db.query("plots").collect();
  },
});

export const getByPlotId = query({
  args: { plotId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("plots")
      .withIndex("by_plotId", (q) => q.eq("plotId", args.plotId))
      .unique();
  },
});

export const getSectionSummary = query({
  args: {},
  handler: async (ctx) => {
    const allPlots = await ctx.db.query("plots").collect();

    const sectionMap: Record<
      string,
      { totalPlots: number; totalOccupants: number }
    > = {};

    for (const plot of allPlots) {
      if (!sectionMap[plot.section]) {
        sectionMap[plot.section] = { totalPlots: 0, totalOccupants: 0 };
      }
      sectionMap[plot.section].totalPlots++;
      sectionMap[plot.section].totalOccupants += plot.occupants;
    }

    return Object.entries(sectionMap)
      .map(([section, data]) => ({
        section,
        ...data,
      }))
      .sort((a, b) => a.section.localeCompare(b.section));
  },
});
