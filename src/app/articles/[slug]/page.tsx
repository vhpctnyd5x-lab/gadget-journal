import { getArticles, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { ArticleGlassCard } from '@/components';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleStructuredData } from './structured-data';
import { auth } from '@clerk/nextjs/server';
import { ArticlePaywall } from './paywall';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Not Found' };
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg key={star} className={`w-5 h-5 ${filled || half ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

// 未ログイン時は最初のsectionのみ表示
const PREVIEW_SECTIONS = 1;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(article.slug);
  const { userId } = await auth();
  const isSignedIn = !!userId;

  const sectionsToShow = isSignedIn
    ? article.sections
    : article.sections.slice(0, PREVIEW_SECTIONS);

  return (
    <>
      <ArticleStructuredData article={article} />

      <article>
        {/* ── Hero ── */}
        <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
            <Link href="/articles" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block text-sm">
              ← 記事一覧に戻る
            </Link>

            {/* Category badge */}
            <div className="mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-slate-900 dark:text-white">
              {article.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-8 border-b border-slate-200 dark:border-slate-800">
              <span>{new Date(article.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>著者: {article.author}</span>
              {article.rating && <StarRating rating={article.rating} />}
            </div>
          </div>

          {/* Hero Image */}
          {article.image && (
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pb-12">
              <img
                src={article.image}
                alt={article.title}
                className="w-full rounded-2xl shadow-lg object-cover"
              />
              <p className="text-xs text-slate-400 mt-2 text-center">© Apple Inc.</p>
            </div>
          )}
        </div>

        {/* ── Pros / Cons ── */}
        {isSignedIn && article.pros && article.cons && (
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Pros */}
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-2xl p-5">
                <h3 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  良い点
                </h3>
                <ul className="space-y-2">
                  {article.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-green-800 dark:text-green-300 flex items-start gap-2">
                      <span className="mt-0.5 text-green-500 flex-shrink-0">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Cons */}
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-5">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  気になる点
                </h3>
                <ul className="space-y-2">
                  {article.cons.map((con, i) => (
                    <li key={i} className="text-sm text-red-800 dark:text-red-300 flex items-start gap-2">
                      <span className="mt-0.5 text-red-500 flex-shrink-0">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── Article Sections ── */}
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          <div className="space-y-10">
            {sectionsToShow.map((section, i) => (
              <section key={i}>
                <h2 className="text-2xl font-bold mb-4 pb-3 border-l-4 border-blue-500 pl-4 text-slate-900 dark:text-white">
                  {section.heading}
                </h2>
                <div className="text-[17px] leading-[1.85] text-slate-700 dark:text-slate-300 space-y-4">
                  {section.text.split('\n\n').map((paragraph, j) => (
                    paragraph.trim() && (
                      <p key={j}>{paragraph.trim()}</p>
                    )
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Paywall */}
          {!isSignedIn && <ArticlePaywall />}

          {/* Tags (signed-in only) */}
          {isSignedIn && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900 py-16">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-bold mb-8">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <ArticleGlassCard
                  key={a.slug}
                  title={a.title}
                  description={a.description}
                  category={a.category}
                  image={a.image}
                  href={`/articles/${a.slug}`}
                  date={new Date(a.date).toLocaleDateString('ja-JP')}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
