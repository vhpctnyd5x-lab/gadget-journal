import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);
    const { content } = await compileMDX({ source: article.content });

    return (
      <article className="prose prose-zinc max-w-3xl dark:prose-invert">
        <h1>{String(article.data.title ?? slug)}</h1>
        <p className="text-sm text-zinc-500">{String(article.data.date ?? '')}</p>
        {content}
      </article>
    );
  } catch {
    notFound();
  }
}
