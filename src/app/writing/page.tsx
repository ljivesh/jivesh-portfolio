import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { getArticles } from "@/lib/writing";

export const metadata = { title: "Writing", description: "Technical writing about AI agents, production systems, commerce, and browser automation." };

export default function WritingPage() {
  const articles = getArticles();
  return (
    <main id="main-content" className="portfolio-container listing-page">
      <BlurFade><p className="listing-kicker">Engineering notes</p><h1>Writing</h1><p>Architecture, implementation details, and lessons from building AI products outside the demo.</p></BlurFade>
      <div className="article-list">
        {articles.map((article, index) => (
          <BlurFade delay={index * .05} key={article.slug}>
            <Link className="article-row" href={`/writing/${article.slug}`}>
              <div className="article-row-meta"><span>{new Date(article.publishedAt).toLocaleDateString("en", { month: "short", year: "numeric" })}</span><span>{article.readingTime}</span></div>
              <div className="flex flex-wrap gap-2">{article.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
              <h2>{article.title}</h2><p>{article.description}</p><ArrowUpRight className="article-arrow" />
            </Link>
          </BlurFade>
        ))}
      </div>
    </main>
  );
}
