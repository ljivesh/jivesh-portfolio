import { describe, expect, it } from "vitest";
import { getArticle, getArticles } from "./writing";

describe("writing content", () => {
  it("loads and indexes the launch article", () => { const articles = getArticles(); expect(articles.length).toBeGreaterThan(0); const article = getArticle("multi-channel-ai-commerce-agent"); expect(article?.title).toContain("Multi-Channel AI Commerce Agent"); expect(article?.headings.length).toBeGreaterThan(5); expect(article?.readingTime).toMatch(/min read/); });
});
