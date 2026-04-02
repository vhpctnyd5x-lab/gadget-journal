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
    const sourceName = String(article.data.sourceName ?? '');
    const sourceUrl = String(article.data.sourceUrl ?? '');

    return (
      <article className="prose prose-zinc max-w-3xl dark:prose-invert">
        <h1>{String(article.data.title ?? slug)}</h1>
        <p className="text-sm text-zinc-500">{String(article.data.date ?? '')}</p>
        {content}
        {sourceName && sourceUrl ? (
          <section className="mt-10 rounded-2xl border border-zinc-200 p-5 text-sm dark:border-zinc-700">
            <p className="font-semibold">出典</p>
            <p>
              出典: <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{sourceName}</a>
            </p>
            <ul>
              <li>引用は必要最小限に限定</li>
              <li>改変せずに原文の意味を維持</li>
              <li>本サイトの解説を主として掲載</li>
            </ul>
          </section>
        ) : null}
      </article>
    );
  } catch {
    notFound();
  }
}
