import type { MetadataRoute } from "next";
import { getCv } from "@/lib/cv";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? getCv().seo.siteUrl;
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
