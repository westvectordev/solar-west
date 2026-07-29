import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "@sanity/client";

/**
 * Surgical, non-destructive content fixes for the live `landingPageSingleton`.
 *
 * Unlike sync-landing-to-sanity.mjs (which full-replaces the document), this uses
 * field-level patches, so images and every other field are left untouched. Each fix
 * is a clear bug correction, not a copy rewrite:
 *
 *   1. footer.phone       — strip the leading space
 *   2. expertise.items[0] — remove a leaked internal editor note
 *
 * NOTE: footer.email is deliberately left alone. The client's address really does
 * contain a Cyrillic "с" (west_veсtor@ukr.net) — it looks like a homoglyph typo but
 * is the correct address. Do not "normalize" it to Latin.
 *
 * Run with `--dry` to preview the patch without writing.
 */

async function loadEnvFile(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim().replace(/^"|"$/g, "");
      if (key && !(key in process.env)) process.env[key] = value;
    }
  } catch {
    // ignore
  }
}

const DOC_ID = "landingPageSingleton";
const NOTE_RE = /\s*\(решта пунктів не чіпай[^)]*\)\s*$/u;

async function main() {
  const cwd = process.cwd();
  await loadEnvFile(path.join(cwd, ".env.local"));

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  if (!token || token.startsWith("your_")) throw new Error("Missing SANITY_API_WRITE_TOKEN.");

  const client = createClient({ projectId, dataset, apiVersion: "2026-03-23", token, useCdn: false });

  const doc = await client.getDocument(DOC_ID);
  if (!doc) throw new Error(`Document ${DOC_ID} not found.`);

  const set = {};

  // 1. phone — trim surrounding whitespace
  const currentPhone = doc.footer?.phone ?? "";
  if (currentPhone !== currentPhone.trim()) {
    set["footer.phone"] = currentPhone.trim();
  }

  // 2. expertise.items[0] — strip leaked editor note
  const items = doc.expertise?.items ?? [];
  if (items[0] && NOTE_RE.test(items[0])) {
    set["expertise.items[0]"] = items[0].replace(NOTE_RE, "").trimEnd();
  }

  if (Object.keys(set).length === 0) {
    console.log("Nothing to patch — content already clean.");
    return;
  }

  console.log("Planned patch (set):");
  for (const [k, v] of Object.entries(set)) console.log(`  ${k} = ${JSON.stringify(v)}`);

  if (process.argv.includes("--dry")) {
    console.log("\n--dry: no changes written.");
    return;
  }

  await client.patch(DOC_ID).set(set).commit();
  console.log("\n✓ Patched landingPageSingleton.");
}

main().catch((error) => {
  console.error("Content patch failed:", error.message);
  process.exit(1);
});
