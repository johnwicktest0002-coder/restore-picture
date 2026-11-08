import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-08");
  const pages = [
    { path: "", priority: 1 },
    { path: "/download", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}
