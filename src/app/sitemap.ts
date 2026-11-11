import type { MetadataRoute } from "next";
import { getAllContentMeta } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://getsyllaba.com";
  const staticRoutes = ["", "/catalog", "/pricing", "/about", "/contact", "/privacy", "/terms"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    }),
  );

  const lessonRoutes = getAllContentMeta().map((item) => ({
    url: `${base}/learn/${item.slug}`,
    lastModified: new Date(item.publishedAt),
  }));

  return [...staticRoutes, ...lessonRoutes];
}
