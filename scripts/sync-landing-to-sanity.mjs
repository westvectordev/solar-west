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
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }

      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim().replace(/^"|"$/g, "");
      if (key && !(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore missing .env.local
  }
}

async function main() {
  const cwd = process.cwd();
  await loadEnvFile(path.join(cwd, ".env.local"));
  await loadEnvFile(path.join(cwd, ".env.example"));

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  }
  if (!token || token.startsWith("your_")) {
    throw new Error("Missing SANITY_API_WRITE_TOKEN.");
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-03-23",
    token,
    useCdn: false,
  });

  const contentPath = path.join(cwd, "content", "landing.json");
  const landing = JSON.parse(await readFile(contentPath, "utf8"));

  async function uploadLocalImage(publicPath, fallbackName) {
    if (!publicPath || typeof publicPath !== "string") {
      return undefined;
    }
    if (!publicPath.startsWith("/")) {
      return undefined;
    }

    const absolutePath = path.join(cwd, "public", publicPath.replace(/^\//, ""));
    const filename = path.basename(absolutePath) || fallbackName;
    const asset = await client.assets.upload("image", createReadStream(absolutePath), {
      filename,
    });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  }

  const bannerImage = await uploadLocalImage(landing.hero.bannerImage, "banner-image");
  const sliderWithAssets = [];
  for (const [index, slide] of landing.hero.slider.entries()) {
    const image = await uploadLocalImage(slide.image, `slide-${index + 1}`);
    sliderWithAssets.push({
      _key: `slide-${index + 1}`,
      title: slide.title,
      description: slide.description,
      metric: slide.metric,
      ...(image ? { image } : {}),
    });
  }

  const doc = {
    _id: "landingPageSingleton",
    _type: "landingPage",
    companyName: landing.companyName,
    tagline: landing.tagline,
    navigation: landing.navigation.map((item, index) => ({
      _key: `nav-${index + 1}`,
      label: item.label,
      href: item.href,
    })),
    hero: {
      eyebrow: landing.hero.eyebrow,
      title: landing.hero.title,
      description: landing.hero.description,
      primaryCta: landing.hero.primaryCta,
      secondaryCta: landing.hero.secondaryCta,
      stats: landing.hero.stats.map((item, index) => ({
        _key: `stat-${index + 1}`,
        value: item.value,
        label: item.label,
      })),
      slider: sliderWithAssets,
      ...(bannerImage ? { bannerImage } : {}),
    },
    benefits: landing.benefits.map((item, index) => ({
      _key: `benefit-${index + 1}`,
      title: item.title,
      description: item.description,
    })),
    services: landing.services.map((item, index) => ({
      _key: `service-${index + 1}`,
      title: item.title,
      description: item.description,
    })),
    process: landing.process.map((item, index) => ({
      _key: `step-${index + 1}`,
      step: item.step,
      title: item.title,
      description: item.description,
    })),
    projects: landing.projects.map((item, index) => ({
      _key: `project-${index + 1}`,
      name: item.name,
      location: item.location,
      summary: item.summary,
      result: item.result,
    })),
    testimonials: landing.testimonials.map((item, index) => ({
      _key: `testimonial-${index + 1}`,
      quote: item.quote,
      name: item.name,
      role: item.role,
    })),
    faq: landing.faq.map((item, index) => ({
      _key: `faq-${index + 1}`,
      question: item.question,
      answer: item.answer,
    })),
    cta: landing.cta,
    footer: landing.footer,
  };

  await client.createOrReplace(doc);
  console.log("Sanity content sync completed. Document: landingPageSingleton");
}

main().catch((error) => {
  console.error("Sanity sync failed:", error.message);
  process.exit(1);
});
