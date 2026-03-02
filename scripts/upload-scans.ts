/**
 * Upload scanned documents from the Access DB extraction to Convex file storage.
 *
 * This script:
 * 1. Reads the image-record mapping from extracted-scans/_image_record_map.json
 * 2. For each image, finds the matching burial record in Convex
 * 3. Uploads the image to Convex file storage
 * 4. Links the storage ID to the burial record
 *
 * Usage: bun run scripts/upload-scans.ts
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import * as fs from "fs";
import * as path from "path";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("Missing NEXT_PUBLIC_CONVEX_URL environment variable");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

interface ImageRecord {
  imageFilename: string;
  parsedName: string;
  matchedName: string;
  surname: string;
  givenName: string;
  middleNames: string | null;
  yearOfDeath: number | null;
  score: number;
}

const SCANS_DIR = path.join(__dirname, "extracted-scans");
const MAP_FILE = path.join(SCANS_DIR, "_image_record_map.json");

async function uploadScans() {
  console.log(`Uploading scanned documents to Convex at ${CONVEX_URL}\n`);

  const imageMap: ImageRecord[] = JSON.parse(
    fs.readFileSync(MAP_FILE, "utf-8"),
  );
  console.log(`Found ${imageMap.length} image-record mappings\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const record of imageMap) {
    const imagePath = path.join(SCANS_DIR, record.imageFilename);

    if (!fs.existsSync(imagePath)) {
      console.log(`  SKIP: File not found: ${record.imageFilename}`);
      skipped++;
      continue;
    }

    try {
      // Find the matching burial in Convex
      const burial = await client.query(api.documents.findBurialByName, {
        surname: record.surname,
        givenName: record.givenName,
        yearOfDeath: record.yearOfDeath ?? undefined,
      });

      if (!burial) {
        console.log(
          `  SKIP: No Convex match for ${record.givenName} ${record.surname} (d.${record.yearOfDeath})`,
        );
        skipped++;
        continue;
      }

      // Check if already has a document
      if (burial.scannedDocumentStorageId) {
        console.log(
          `  SKIP: ${record.matchedName} already has a scanned document`,
        );
        skipped++;
        continue;
      }

      // Get upload URL from Convex
      const uploadUrl = await client.mutation(
        api.documents.generateUploadUrl,
        {},
      );

      // Read the image file
      const imageData = fs.readFileSync(imagePath);

      // Upload to Convex storage
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "image/jpeg" },
        body: imageData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const { storageId } = (await response.json()) as {
        storageId: string;
      };

      // Link the document to the burial record
      await client.mutation(api.documents.linkDocumentToBurial, {
        burialId: burial._id,
        storageId: storageId as any,
        filename: record.imageFilename,
      });

      uploaded++;
      console.log(
        `  ✓ ${record.matchedName} <- ${record.imageFilename} (${(imageData.length / 1024).toFixed(0)}KB)`,
      );
    } catch (err: any) {
      failed++;
      console.error(
        `  ✗ FAIL: ${record.matchedName} - ${err.message}`,
      );
    }
  }

  console.log(`\n=== Upload Summary ===`);
  console.log(`  Uploaded: ${uploaded}`);
  console.log(`  Skipped:  ${skipped}`);
  console.log(`  Failed:   ${failed}`);
  console.log(`  Total:    ${imageMap.length}`);
}

uploadScans().catch(console.error);
