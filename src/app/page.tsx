import { Hero, ArticleCard } from '@/components';

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
    id: 'mac-mini-m4-pro',
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
      {/* Hero Section */}
      <Hero
        title="Apple製品の革新を深掘りする"
        subtitle="iPhone 17e、M5 MacBook Air、iOS 19。最新Apple製品のレビューとガイド。"
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
            <ArticleCard
              key={article.id}
              title={article.title}
              description={article.description}
              category={article.category}
              icon={article.icon}
              image={article.image}
              href={`/articles/${article.id}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">カテゴリ</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Mac', icon: '🖥', slug: 'mac' },
              { name: 'iPad', icon: '📱', slug: 'ipad' },
              { name: 'iPhone', icon: '📲', slug: 'iphone' },
              { name: 'Apple Watch', icon: '⌚', slug: 'watch' },
              { name: 'AirPods', icon: '🎧', slug: 'audio' },
              { name: 'Vision Pro', icon: '🥽', slug: 'spatial' },
              { name: 'Software', icon: '🧠', slug: 'software' },
              { name: 'Ecosystem', icon: '🍎', slug: 'ecosystem' },
            ].map((category) => (
              <a
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-slate-800 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 border border-slate-200 dark:border-slate-700 transition-all duration-200"
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="font-semibold">{category.name}</span>
              </a>
            ))}
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
          <a
            href="/articles"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            記事一覧を見る →
          </a>
        </div>
      </section>
    </>
  );
}
