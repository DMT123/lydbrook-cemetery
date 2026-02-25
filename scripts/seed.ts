import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import seedBurials from "../convex/seed_burials.json";
import seedPlots from "../convex/seed_plots.json";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("Missing NEXT_PUBLIC_CONVEX_URL environment variable");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

async function seed() {
  console.log(`Seeding Convex at ${CONVEX_URL}`);

  const BATCH_SIZE = 25;

  console.log(`\nSeeding ${seedBurials.length} burial records...`);
  for (let i = 0; i < seedBurials.length; i += BATCH_SIZE) {
    const batch = seedBurials.slice(i, i + BATCH_SIZE).map((r: Record<string, unknown>) => ({
      surname: String(r.surname ?? ""),
      givenName: String(r.givenName ?? ""),
      middleNames: r.middleNames ? String(r.middleNames) : undefined,
      ageAtDeath: typeof r.ageAtDeath === "number" ? r.ageAtDeath : undefined,
      agePeriod: r.agePeriod ? String(r.agePeriod) : undefined,
      dateOfDeath: r.dateOfDeath ? String(r.dateOfDeath) : undefined,
      dayOfDeath: typeof r.dayOfDeath === "number" ? r.dayOfDeath : undefined,
      monthOfDeath: r.monthOfDeath ? String(r.monthOfDeath) : undefined,
      yearOfDeath: typeof r.yearOfDeath === "number" ? r.yearOfDeath : undefined,
      placeOfDeath: r.placeOfDeath ? String(r.placeOfDeath) : undefined,
      homeAddress: r.homeAddress ? String(r.homeAddress) : undefined,
      sourceOfEvidence: r.sourceOfEvidence ? String(r.sourceOfEvidence) : undefined,
      recordDate: r.recordDate ? String(r.recordDate) : undefined,
      certificateNumber: r.certificateNumber ? String(r.certificateNumber) : undefined,
      notes: r.notes ? String(r.notes) : undefined,
      plot: r.plot ? String(r.plot) : undefined,
      section: r.section ? String(r.section) : undefined,
      plotNumber: typeof r.plotNumber === "number" ? r.plotNumber : undefined,
      sourceDatabase: String(r.sourceDatabase ?? "unknown"),
    }));

    const count = await client.mutation(api.burials.seed, { records: batch });
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${count} records`);
  }

  console.log(`\nSeeding ${seedPlots.length} plots...`);
  for (let i = 0; i < seedPlots.length; i += BATCH_SIZE) {
    const batch = seedPlots.slice(i, i + BATCH_SIZE).map((p: Record<string, unknown>) => ({
      plotId: String(p.plotId),
      section: String(p.section),
      plotNumber: typeof p.plotNumber === "number" ? p.plotNumber : 0,
      occupants: typeof p.occupants === "number" ? p.occupants : 0,
      summaryText: p.summaryText ? String(p.summaryText) : undefined,
    }));

    const count = await client.mutation(api.burials.seedPlots, { plots: batch });
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${count} plots`);
  }

  console.log("\nSeeding complete!");
}

seed().catch(console.error);
