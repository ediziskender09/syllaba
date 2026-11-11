import type { MetadataRoute } from "next";
import { getAllContentMeta } from "@/lib/content";
import { getAllSeoPages } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/catalog",
    "/pricing",
    "/about",
    "/contact",
    "/guides",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/catalog" || path === "/guides" ? 0.9 : 0.7,
  }));

  const lessonRoutes = getAllContentMeta().map((item) => ({
    url: `${SITE_URL}/learn/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guideRoutes = getAllSeoPages().map((page) => ({
    url: `${SITE_URL}/guides/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...lessonRoutes, ...guideRoutes];
}
