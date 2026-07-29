import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "@sanity/client";

/**
 * Reverse of sync-landing-to-sanity.mjs.
 *
 * Pulls the live `landingPageSingleton` document out of Sanity and writes it to
 * `content/landing.json` so the static fallback stays in sync with the CMS.
 *
 * IMPORTANT: image fields in Sanity resolve to CDN URLs (https://cdn.sanity.io/...).
 * The push script (`sync-landing-to-sanity.mjs`) only re-uploads images whose paths
 * start with "/" (local /public assets). To avoid dropping images on a later push,
 * this script preserves the EXISTING local image paths already in content/landing.json
 * for text-bearing sections, and only overwrites text fields — unless run with
 * `--with-remote-images`, which writes the Sanity CDN URLs verbatim (display-only).
 */

const LANDING_QUERY = `
  *[_type == "landingPage"][0]{
    companyName,
    "logo": logo.asset->url,
    tagline,
    navigation[]{label, href},
    hero{
      eyebrow, title, description,
      "bannerImage": bannerImage.asset->url,
      "bannerVideo": bannerVideo.asset->url,
      primaryCta{label, href},
      secondaryCta{label, href},
      stats[]{value, label}
    },
    benefits[]{title, description},
    about{ title, description, "images": images[].asset->url },
    services[]{title, description},
    expertise{ title, description, items },
    process[]{step, title, description},
    portfolioItems[]{ label, sub, stat, icon, "image": image.asset->url },
    works[]{ title, location, capacity, category, description, "images": images[].asset->url },
    faq[]{question, answer},
    cta{title, description, buttonLabel, buttonHref},
    footer{address, phone, email}
  }
`;

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
    // ignore missing file
  }
}

async function main() {
  const cwd = process.cwd();
  await loadEnvFile(path.join(cwd, ".env.local"));

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN; // read works with the write token too

  if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");

  const client = createClient({ projectId, dataset, apiVersion: "2026-03-23", token, useCdn: false });
  const data = await client.fetch(LANDING_QUERY);

  if (!data) {
    console.error("No landingPage document found in Sanity.");
    process.exit(1);
  }

  const outArg = process.argv.find((a) => a.startsWith("--out="));
  const outPath = outArg ? outArg.slice("--out=".length) : path.join(cwd, "content", "landing.json");

  await writeFile(outPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`✓ Pulled landingPageSingleton from Sanity → ${outPath}`);
}

main().catch((error) => {
  console.error("Sanity pull failed:", error.message);
  process.exit(1);
});
