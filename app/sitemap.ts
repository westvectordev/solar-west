import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://west-vector.com.ua";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL || '',
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
