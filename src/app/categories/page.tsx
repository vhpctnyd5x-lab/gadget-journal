import Link from 'next/link';
import { getArticles } from '@/lib/articles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カテゴリ | Gadget Journal',
  description: 'Apple製品のカテゴリ一覧。Mac、iPhone、iPad、Apple Watch、AirPodsなどのレビュー記事をカテゴリ別に探せます。',
};

const CATEGORY_META: Record<string, { icon: string; description: string; color: string }> = {
  Mac: { icon: '💻', description: 'MacBook、Mac Studio、Mac miniのレビューと比較', color: 'from-slate-400/20 to-slate-600/20' },
  iPhone: { icon: '📱', description: 'iPhone 17シリーズの詳細レビューとガイド', color: 'from-blue-400/20 to-blue-600/20' },
  iPad: { icon: '🖥️', description: 'iPad Pro、iPad Airの活用法とレビュー', color: 'from-purple-400/20 to-purple-600/20' },
  Wearables: { icon: '⌚', description: 'Apple Watch、AirPodsの最新情報', color: 'from-green-400/20 to-green-600/20' },
  'Vision Pro': { icon: '🥽', description: 'Apple Vision Proの可能性と体験レポート', color: 'from-orange-400/20 to-red-400/20' },
  iOS: { icon: '📲', description: 'iOS・iPadOSの新機能と使い方', color: 'from-cyan-400/20 to-blue-400/20' },
  macOS: { icon: '🖱️', description: 'macOSの新機能と便利な使い方', color: 'from-indigo-400/20 to-purple-400/20' },
  Ecosystem: { icon: '🌐', description: 'Appleエコシステムの活用と連携', color: 'from-teal-400/20 to-green-400/20' },
  Security: { icon: '🔒', description: 'Appleのセキュリティとプライバシー機能', color: 'from-red-400/20 to-rose-400/20' },
  History: { icon: '📖', description: 'Appleの歴史と革新の軌跡', color: 'from-amber-400/20 to-orange-400/20' },
  'Apple Intelligence': { icon: '🤖', description: 'Apple AIの最新動向と活用法', color: 'from-violet-400/20 to-purple-400/20' },
};

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

export default async function CategoriesPage() {
  const articles = await getArticles();
  const categoryCounts = articles.reduce<Record<string, number>>((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">カテゴリ</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {categories.length}カテゴリ・{articles.length}記事
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([category, count]) => {
            const meta = CATEGORY_META[category] ?? { icon: '📁', description: category, color: 'from-slate-400/20 to-slate-600/20' };
            const slug = categoryToSlug(category);
            return (
              <Link
                key={category}
                href={`/category/${slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${meta.color} border border-white/20 p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg backdrop-blur-sm`}
              >
                <div className="text-4xl mb-3">{meta.icon}</div>
                <h2 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                  {meta.description}
                </p>
                <span className="inline-block text-xs font-medium bg-white/40 dark:bg-white/10 px-3 py-1 rounded-full">
                  {count}件の記事
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
