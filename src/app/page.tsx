import Link from 'next/link';
import { GlassHero, ArticleGlassCard } from '@/components';

const featuredArticles = [
  {
    id: 'macbook-air-m5',
    title: 'M5 MacBook Air',
    description: '驚異的なパフォーマンスと薄さを両立した新世代Air。',
    category: 'Mac',
    icon: '💻',
    image: '/mwqLtfoHvDwk.jpg',
  },
  {
    id: 'iphone-17e',
    title: 'iPhone 17e',
    description: 'Apple Intelligenceを手軽に体験できる新スタンダード。',
    category: 'iPhone',
    icon: '📲',
    image: '/DfMi0pbXqqGF.jpg',
  },
  {
    id: 'apple-intelligence',
    title: 'Apple Intelligence',
    description: 'Writing Tools、Image Playground。AI新時代の幕開け。',
    category: 'Software',
    icon: '🧠',
    image: '/6BzbPQAE4lCW.jpg',
  },
  {
    id: 'ipad-pro-m5',
    title: 'iPad Pro M5',
    description: 'Tandem OLEDとM5チップ。究極のタブレット体験。',
    category: 'iPad',
    icon: '📱',
    image: '/Bo7BV2xApq7V.jpg',
  },
  {
    id: 'mac-mini-m4',
    title: 'Mac mini M4 Pro',
    description: '手のひらサイズで圧倒的なパフォーマンス。',
    category: 'Mac',
    icon: '🎛',
    image: '/CFkSueBqlWJp.jpg',
  },
  {
    id: 'vision-pro',
    title: 'Apple Vision Pro',
    description: '空間コンピューティングが切り開く、次の10年。',
    category: 'Spatial',
    icon: '🥽',
    image: '/Cy7NJcxIYCxc.jpg',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section with Liquid Glass */}
      <GlassHero
        title="Apple製品の革新を深掘りする"
        subtitle="iPhone 17e、M5 MacBook Air、iOS 19。最新Apple製品のレビューとガイド。"
        gradient="blue"
        cta={{ text: '記事を探す', href: '/articles' }}
      />

      {/* Featured Articles */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">注目の記事</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            最新のApple製品レビューと深掘り解説
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <ArticleGlassCard
              key={article.id}
              title={article.title}
              description={article.description}
              category={article.category}
              icon={article.icon}
              image={article.image}
              href={`/articles/${article.id}`}
              date="2026.04"
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">探索する</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              すべてのApple製品カテゴリから記事を探す
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Mac', icon: '💻', description: 'MacBook、Mac Studio、Mac miniのレビュー', color: 'bg-gradient-to-br from-slate-400/20 to-slate-600/20', slug: 'mac' },
              { name: 'iPhone', icon: '📱', description: 'iPhone 17シリーズの詳細レビュー', color: 'bg-gradient-to-br from-blue-400/20 to-blue-600/20', slug: 'iphone' },
              { name: 'iPad', icon: '🖥️', description: 'iPad Pro、iPad Airの活用法', color: 'bg-gradient-to-br from-purple-400/20 to-purple-600/20', slug: 'ipad' },
              { name: 'Wearables', icon: '⌚', description: 'Apple Watch、AirPodsの最新情報', color: 'bg-gradient-to-br from-green-400/20 to-green-600/20', slug: 'wearables' },
              { name: 'Software', icon: '🧠', description: 'iOS・macOSの新機能と使い方', color: 'bg-gradient-to-br from-cyan-400/20 to-blue-400/20', slug: 'software' },
              { name: 'Spatial', icon: '🥽', description: '空間コンピューティングの体験', color: 'bg-gradient-to-br from-orange-400/20 to-red-400/20', slug: 'spatial' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`group relative overflow-hidden rounded-2xl ${category.color} border border-white/20 p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg backdrop-blur-sm`}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-800">
            <h3 className="text-xl font-bold mb-2">すべてのカテゴリを表示</h3>
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              Appleエコシステム、セキュリティ、歴史など、さらに詳しくお探しですか？
            </p>
            <Link
              href="/categories"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
            >
              全カテゴリを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            すべての記事を見る
          </h2>
          <p className="text-lg mb-8 opacity-90">
            70以上のApple製品レビュー、ガイド、深掘り解説。あなたのAppleライフを充実させる情報が満載です。
          </p>
          <Link
            href="/articles"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            記事一覧を見る →
          </Link>
        </div>
      </section>
    </>
  );
}
