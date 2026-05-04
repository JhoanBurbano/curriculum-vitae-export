import type { MetadataRoute } from "next";
import { getCv } from "@/lib/cv";
import { getProjectSlugs } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const c = getCv();
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? c.seo.siteUrl).replace(/\/$/, "");
  const now = new Date();
  const staticPaths = ["", "/experience", "/projects", "/services", "/request-service", "/cv"];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  const projectEntries: MetadataRoute.Sitemap = getProjectSlugs(c).map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticEntries, ...projectEntries];
}
