import type { MetadataRoute } from "next";
import { getAllWonders, getCategories } from "@/lib/wonders";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wonderwhydaily.com";

  return [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/archive`, changeFrequency: "daily", priority: 0.8 },
    ...getCategories().map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...getAllWonders().map((wonder) => ({
      url: `${baseUrl}/wonders/${wonder.slug}`,
      lastModified: wonder.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
