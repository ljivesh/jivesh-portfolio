import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";
import { getArticles } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = [
    "", "/work", "/writing", "/guestbook", "/contact", "/resume",
    ...projects.map((project) => `/work/${project.slug}`),
    ...getArticles().map((article) => `/writing/${article.slug}`),
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "monthly" : "yearly",
    priority: page === "" ? 1 : 0.8,
  }));
}
