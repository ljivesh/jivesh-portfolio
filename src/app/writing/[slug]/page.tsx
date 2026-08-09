import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/writing/mdx-components";
import { getArticle, getArticles } from "@/lib/writing";

export function generateStaticParams() { return getArticles().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = getArticle((await params).slug); return article ? { title: article.title, description: article.description, alternates: { canonical: `/writing/${article.slug}` } } : {}; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug); if (!article) notFound();
  return (
    <main id="main-content" className="portfolio-container article-page">
      <header>
        <Link className="back-link" href="/writing"><ArrowLeft className="size-3.5" />Back to writing</Link>
        <div className="mt-10 flex flex-wrap gap-2">{article.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
        <h1>{article.title}</h1><p>{article.description}</p>
        <div className="article-meta"><time>{new Date(article.publishedAt).toLocaleDateString("en", { dateStyle: "long" })}</time><span>{article.readingTime}</span></div>
      </header>
      <article className="article-prose"><MDXRemote source={article.content} components={mdxComponents} options={{ mdxOptions: { rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-default" }]] } }}/></article>
    </main>
  );
}
