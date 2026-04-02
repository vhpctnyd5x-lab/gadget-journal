import Link from 'next/link';
import { getCategoryCounts } from '@/lib/articles';

const categoryMeta: Record<string, { slug: string; icon: string }> = {
  iPhone: { slug: 'iphone', icon: '📱' },
  Mac: { slug: 'mac', icon: '💻' },
  iPad: { slug: 'ipad', icon: '🧩' },
  'Apple Watch': { slug: 'apple-watch', icon: '⌚' },
  'Vision Pro': { slug: 'vision-pro', icon: '🥽' },
  Software: { slug: 'software', icon: '🧠' },
  'Apple Intelligence': { slug: 'apple-intelligence', icon: '✨' }
};

export default async function CategoriesPage() {
  const counts = await getCategoryCounts();
  const categories = Object.entries(counts).map(([name, count]) => ({
    name,
    count,
    slug: categoryMeta[name]?.slug ?? encodeURIComponent(name.toLowerCase()),
    icon: categoryMeta[name]?.icon ?? '📁'
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">カテゴリ</h1>
      <p className="mb-10 text-zinc-600 dark:text-zinc-400">Apple製品をテーマごとに整理しています</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/articles?category=${cat.slug}`}
            className="group rounded-3xl border border-zinc-200 p-8 transition-all hover:border-orange-500 hover:shadow-xl dark:border-zinc-800"
          >
            <div className="mb-4 text-3xl">{cat.icon}</div>
            <h2 className="mb-2 text-2xl font-semibold group-hover:text-orange-600">{cat.name}</h2>
            <p className="text-zinc-500">{cat.count}件の記事</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
