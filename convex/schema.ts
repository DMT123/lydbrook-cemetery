import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  burials: defineTable({
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
  })
    .index("by_surname", ["surname"])
    .index("by_plot", ["plot"])
    .index("by_section", ["section"])
    .index("by_year", ["yearOfDeath"])
    .searchIndex("search_name", {
      searchField: "surname",
      filterFields: ["section", "yearOfDeath"],
    }),

  plots: defineTable({
    plotId: v.string(),
    section: v.string(),
    plotNumber: v.number(),
    occupants: v.number(),
    summaryText: v.optional(v.string()),
  })
    .index("by_plotId", ["plotId"])
    .index("by_section", ["section"]),
});
