import { ArticleCard } from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';

const slugMap: Record<string, string> = {
  iphone: 'iPhone',
  mac: 'Mac',
  ipad: 'iPad',
  'apple-watch': 'Apple Watch',
  'vision-pro': 'Vision Pro',
  software: 'Software',
  'apple-intelligence': 'Apple Intelligence'
};

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const articles = await getAllArticles();
  const selectedCategory = params.category ? (slugMap[params.category] ?? params.category) : null;
  const filtered = selectedCategory ? articles.filter((article) => article.category === selectedCategory) : articles;

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">記事を探す</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          {selectedCategory ? `${selectedCategory} の記事を表示中` : '最新の記事をカテゴリ横断で一覧表示します。'}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">レビュー、使いこなし、将来予測まで、実利用ベースの内容を掲載しています。</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
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
      {filtered.length === 0 ? <p className="text-zinc-500">該当する記事がありません。</p> : null}
    </section>
  );
}
