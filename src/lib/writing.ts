import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const directory = path.join(process.cwd(), "content/writing");

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  content: string;
  readingTime: string;
  headings: { id: string; text: string }[];
};

function headings(content: string) {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => ({ text: match[1], id: match[1].toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-") }));
}

export function getArticles(): Article[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter((file) => file.endsWith(".mdx")).map((file) => getArticle(file.replace(/\.mdx$/, ""))!).filter(Boolean).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string): Article | null {
  const file = path.join(directory, `${slug}.mdx`); if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, "utf8"); const parsed = matter(source);
  return { slug, title: String(parsed.data.title), description: String(parsed.data.description), publishedAt: String(parsed.data.publishedAt), tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [], content: parsed.content, readingTime: readingTime(parsed.content).text, headings: headings(parsed.content) };
}
