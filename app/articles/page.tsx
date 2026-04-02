import { ArticleCard } from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">記事を探す</h1>
        <p className="text-zinc-600 dark:text-zinc-300">最新の記事をカテゴリ横断で一覧表示します。</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
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
