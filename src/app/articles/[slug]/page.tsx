import { getArticles, getArticleBySlug, getRelatedArticles, Article } from '@/lib/articles';
import { ArticleGlassCard } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArticleStructuredData } from './structured-data';
import { ArticleContent } from './article-content';

const BASE_URL = 'https://gadget-journal.vercel.app';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Not Found' };

  const canonical = `${BASE_URL}/articles/${slug}`;
  const keywords = [
    ...article.tags,
    ...(article.seoKeywords ?? []),
    article.category,
    'Apple',
  ];

  return {
    title: article.title,
    description: article.description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  };
}

// ──── Sub-components ────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${rating >= star ? 'text-amber-400' : rating >= star - 0.5 ? 'text-amber-300' : 'text-slate-300 dark:text-slate-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function Breadcrumb({ article }: { article: Article }) {
  const crumbs = [
    { label: 'ホーム', href: '/' },
    { label: article.category, href: `/category/${article.category.toLowerCase().replace(/\s+/g, '-')}` },
    { label: article.title, href: null },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${BASE_URL}${crumb.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="パンくずリスト" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors min-h-[44px] flex items-center">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[200px]" aria-current="page">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

// ──── Hero Image (SVG or raster) ────────────────────────────────

function HeroImage({ src, alt }: { src: string; alt: string }) {
  const isSvg = src.endsWith('.svg');

  if (isSvg) {
    // SVGはnext/imageで最適化不要、imgタグで表示
    return (
      <img
        src={src}
        alt={alt}
        className="w-full rounded-2xl shadow-lg"
        loading="eager"
      />
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
      />
    </div>
  );
}

// ──── Main Page ──────────────────────────────────────────────────

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(article.slug);

  return (
    <>
      <ArticleStructuredData article={article} />

      <article>
        {/* ── Hero ── */}
        <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 pb-6">
            <Breadcrumb article={article} />

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
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>著者: {article.author}</span>
              {article.rating && <StarRating rating={article.rating} />}
            </div>
          </div>

          {/* Hero Image */}
          {article.image && (
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 pb-12">
              <HeroImage src={article.image} alt={article.title} />
              <p className="text-xs text-slate-400 mt-2 text-center">© Apple Inc.</p>
            </div>
          )}
        </div>

        <ArticleContent
          sections={article.sections}
          pros={article.pros}
          cons={article.cons}
          tags={article.tags}
          specTable={article.specTable}
          benchmarks={article.benchmarks}
        />
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
