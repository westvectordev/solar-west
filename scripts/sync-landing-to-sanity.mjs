import { readFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@sanity/client";

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
  await loadEnvFile(path.join(cwd, ".env.example"));

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  if (!token || token.startsWith("your_")) throw new Error("Missing SANITY_API_WRITE_TOKEN.");

  const client = createClient({ projectId, dataset, apiVersion: "2026-03-23", token, useCdn: false });

  const landing = JSON.parse(await readFile(path.join(cwd, "content", "landing.json"), "utf8"));

  async function uploadImage(publicPath, fallbackName) {
    if (!publicPath || !publicPath.startsWith("/")) return undefined;
    const absPath = path.join(cwd, "public", publicPath.replace(/^\//, ""));
    const asset = await client.assets.upload("image", createReadStream(absPath), {
      filename: path.basename(absPath) || fallbackName,
    });
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  }

  // Hero banner image
  const bannerImage = await uploadImage(landing.hero.bannerImage, "banner-image");

  // About images
  const aboutImages = [];
  for (const [i, src] of (landing.about?.images ?? []).entries()) {
    const img = await uploadImage(src, `about-${i + 1}`);
    if (img) aboutImages.push({ ...img, _key: `about-img-${i + 1}` });
  }

  // Works images
  const worksWithAssets = [];
  for (const [wi, work] of (landing.works ?? []).entries()) {
    const images = [];
    for (const [ii, src] of (work.images ?? []).entries()) {
      const img = await uploadImage(src, `work-${wi + 1}-img-${ii + 1}`);
      if (img) images.push({ ...img, _key: `work-${wi + 1}-img-${ii + 1}` });
    }
    worksWithAssets.push({
      _key: `work-${wi + 1}`,
      title: work.title,
      location: work.location,
      capacity: work.capacity,
      category: work.category,
      description: work.description,
      images,
    });
  }

  // Portfolio items images
  const portfolioWithAssets = [];
  for (const [pi, item] of (landing.portfolioItems ?? []).entries()) {
    const image = item.image ? await uploadImage(item.image, `portfolio-${pi + 1}`) : undefined;
    portfolioWithAssets.push({
      _key: `portfolio-${pi + 1}`,
      label: item.label,
      sub: item.sub,
      stat: item.stat,
      icon: item.icon,
      ...(image ? { image } : {}),
    });
  }

  const doc = {
    _id: "landingPageSingleton",
    _type: "landingPage",
    companyName: landing.companyName,
    tagline: landing.tagline,
    navigation: landing.navigation.map((item, i) => ({
      _key: `nav-${i + 1}`,
      label: item.label,
      href: item.href,
    })),
    hero: {
      eyebrow: landing.hero.eyebrow,
      title: landing.hero.title,
      description: landing.hero.description,
      primaryCta: landing.hero.primaryCta,
      secondaryCta: landing.hero.secondaryCta,
      stats: landing.hero.stats.map((item, i) => ({
        _key: `stat-${i + 1}`,
        value: item.value,
        label: item.label,
      })),
      ...(bannerImage ? { bannerImage } : {}),
    },
    benefits: landing.benefits.map((item, i) => ({
      _key: `benefit-${i + 1}`,
      title: item.title,
      description: item.description,
    })),
    about: {
      title: landing.about?.title,
      description: landing.about?.description,
      images: aboutImages,
    },
    services: landing.services.map((item, i) => ({
      _key: `service-${i + 1}`,
      title: item.title,
      description: item.description,
    })),
    expertise: {
      title: landing.expertise?.title,
      description: landing.expertise?.description,
      items: landing.expertise?.items ?? [],
    },
    process: landing.process.map((item, i) => ({
      _key: `step-${i + 1}`,
      step: item.step,
      title: item.title,
      description: item.description,
    })),
    portfolioItems: portfolioWithAssets,
    works: worksWithAssets,
    faq: landing.faq.map((item, i) => ({
      _key: `faq-${i + 1}`,
      question: item.question,
      answer: item.answer,
    })),
    cta: landing.cta,
    footer: landing.footer,
  };

  await client.createOrReplace(doc);
  console.log("✓ Sanity content sync completed. Document: landingPageSingleton");
}

main().catch((error) => {
  console.error("Sanity sync failed:", error.message);
  process.exit(1);
});
