import Link from 'next/link';
import { ArticleCard } from '@/components/ArticleCard';
import { getAllArticles, getCategoryCounts } from '@/lib/articles';

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [articles, categoryCounts, params] = await Promise.all([
    getAllArticles(),
    getCategoryCounts(),
    searchParams
  ]);

  const selected = params.category;
  const filteredArticles = selected ? articles.filter((article) => article.category === selected) : articles;

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">カテゴリ</h1>
        <p className="text-zinc-600 dark:text-zinc-300">カテゴリごとに記事を整理しています。</p>
      </header>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/categories"
          className={`rounded-full border px-4 py-2 text-sm ${!selected ? 'border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' : 'border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-200'}`}
        >
          すべて <span className="ml-1 text-xs">{articles.length}</span>
        </Link>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <Link
            key={category}
            href={`/categories?category=${encodeURIComponent(category)}`}
            className={`rounded-full border px-4 py-2 text-sm ${selected === category ? 'border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300' : 'border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-200'}`}
          >
            {category} <span className="ml-1 text-xs">{count}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            image={article.coverImage}
            category={article.category}
          />
        ))}
      </div>
    </section>
  );
}
