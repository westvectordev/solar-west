import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://west-vector.com.ua";

// Bump this when the landing page content meaningfully changes, so crawlers see a
// stable, honest last-modified date instead of "now" on every request.
const LAST_MODIFIED = "2026-07-29";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL || '',
      lastModified: new Date(LAST_MODIFIED),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
