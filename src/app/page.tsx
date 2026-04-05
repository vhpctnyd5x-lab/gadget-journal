import { getArticles } from '@/lib/articles';
import { GlassHero, ArticleGlassCard } from '@/components';
import Link from 'next/link';

const CATEGORIES = [
  { name: 'Mac', icon: '🖥', slug: 'mac' },
  { name: 'iPad', icon: '📱', slug: 'ipad' },
  { name: 'iPhone', icon: '📲', slug: 'iphone' },
  { name: 'Apple Watch', icon: '⌚', slug: 'watch' },
  { name: 'AirPods', icon: '🎧', slug: 'audio' },
  { name: 'Vision Pro', icon: '🥽', slug: 'spatial' },
  { name: 'Software', icon: '🧠', slug: 'software' },
  { name: 'Ecosystem', icon: '🍎', slug: 'ecosystem' },
];

const FEATURED_SLUGS = [
  'iphone-17e',
  'macbook-air-m5',
  'apple-intelligence',
  'ipad-pro-m5',
  'vision-pro',
  'ios-19',
];

export default async function Home() {
  const allArticles = await getArticles();
  const featuredArticles = FEATURED_SLUGS
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter(Boolean) as typeof allArticles;

  return (
    <>
      {/* Hero */}
      <GlassHero
        title="Apple製品の革新を深掘りする"
        subtitle="iPhone 17e、M5 MacBook Air、Vision Pro。最新Apple製品の本音レビューと徹底解説。"
        gradient="blue"
        cta={{ text: '記事を探す', href: '/articles' }}
      />

      {/* Featured Articles */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">注目の記事</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            最新のApple製品レビューと深掘り解説
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <ArticleGlassCard
              key={article.slug}
              title={article.title}
              description={article.description}
              category={article.category}
              image={article.image}
              href={`/articles/${article.slug}`}
              date={new Date(article.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short' })}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">カテゴリ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 border border-slate-200 dark:border-slate-700 transition-all duration-200"
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">最新記事</h2>
          <Link href="/articles" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArticles.slice(0, 6).map((article) => (
            <ArticleGlassCard
              key={article.slug}
              title={article.title}
              description={article.description}
              category={article.category}
              image={article.image}
              href={`/articles/${article.slug}`}
              date={new Date(article.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">すべての記事を読む</h2>
          <p className="text-lg mb-8 opacity-90">
            {allArticles.length}本のApple製品レビュー・深掘り解説。あなたの次のApple製品選びに。
          </p>
          <Link
            href="/articles"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-slate-100 transition-colors duration-200"
          >
            記事一覧を見る →
          </Link>
        </div>
      </section>
    </>
  );
}
