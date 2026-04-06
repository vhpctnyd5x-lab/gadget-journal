import { getArticles } from '@/lib/articles';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カテゴリ一覧 | Gadget Journal',
  description: 'Apple製品のカテゴリ別記事一覧',
};

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

const CATEGORY_ICONS: Record<string, string> = {
  iPhone: '📱',
  Mac: '💻',
  iPad: '🖥️',
  Wearables: '⌚',
  Software: '🛠️',
  Audio: '🎧',
  Spatial: '🥽',
  Security: '🔒',
  Guides: '📖',
  Culture: '🏛️',
};

export default async function CategoriesPage() {
  const articles = await getArticles();

  // Build category → article count map
  const categoryMap = new Map<string, number>();
  for (const a of articles) {
    categoryMap.set(a.category, (categoryMap.get(a.category) ?? 0) + 1);
  }

  const categories = Array.from(categoryMap.entries()).sort((a, b) =>
    b[1] - a[1]
  );

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            カテゴリ
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            気になるカテゴリから記事を探す
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([category, count]) => (
            <Link
              key={category}
              href={`/category/${categoryToSlug(category)}`}
              className="group flex items-center gap-5 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200"
            >
              <span className="text-4xl">{CATEGORY_ICONS[category] ?? '📂'}</span>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {count}件の記事
                </p>
              </div>
              <svg
                className="w-5 h-5 ml-auto text-slate-400 group-hover:text-blue-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
