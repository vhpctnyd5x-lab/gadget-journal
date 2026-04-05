import { getArticles, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { ArticleGlassCard } from '@/components';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArticleStructuredData } from './structured-data';
import { auth } from '@clerk/nextjs/server';
import { ArticlePaywall } from './paywall';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${article.title} | Gadget Journal`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
  };
}

// MDXを段落単位で分割して冒頭だけ返す
function getPreviewContent(content: string, paragraphCount = 3): string {
  const lines = content.split('\n');
  let count = 0;
  const previewLines: string[] = [];

  for (const line of lines) {
    previewLines.push(line);
    // 空行のあとにテキストがある段落を1つと数える
    if (line.trim() === '' && previewLines.length > 1) {
      const prevNonEmpty = previewLines.slice(0, -1).findLast((l) => l.trim() !== '');
      if (prevNonEmpty && !prevNonEmpty.startsWith('#') && !prevNonEmpty.startsWith('|') && !prevNonEmpty.startsWith('-')) {
        count++;
        if (count >= paragraphCount) break;
      }
    }
  }

  return previewLines.join('\n');
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(article.slug);
  const { userId } = await auth();
  const isSignedIn = !!userId;

  // 未ログイン時は冒頭3段落のみ表示
  const contentToShow = isSignedIn ? article.content : getPreviewContent(article.content, 3);

  return (
    <>
      <ArticleStructuredData article={article} />
      <article className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
          <Link href="/articles" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
            ← 記事一覧に戻る
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
              {article.category}
            </span>
            <span>{new Date(article.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>著者: {article.author}</span>
          </div>
        </div>

        {/* Hero Image */}
        {article.image && (
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full rounded-2xl shadow-lg"
            />
            <p className="text-xs text-slate-400 mt-2 text-center">画像出典: © Apple Inc.</p>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <div className="prose dark:prose-invert max-w-none">
            <MDXRemote source={contentToShow} />
          </div>

          {/* ペイウォール（未ログイン時） */}
          {!isSignedIn && <ArticlePaywall />}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && isSignedIn && (
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pb-12">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900 py-16">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold mb-8">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleGlassCard
                  key={relatedArticle.slug}
                  title={relatedArticle.title}
                  description={relatedArticle.description}
                  category={relatedArticle.category}
                  image={relatedArticle.image}
                  href={`/articles/${relatedArticle.slug}`}
                  date={new Date(relatedArticle.date).toLocaleDateString('ja-JP')}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
