import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { tours } from "@/lib/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/$/, "");
  const staticPaths = ["", "/rentals", "/about", "/gallery", "/faq", "/book", "/privacy", "/terms"];
  const pages = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const tourPages = tours.map((t) => ({
    url: `${base}/tours/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  return [...pages, ...tourPages];
}
