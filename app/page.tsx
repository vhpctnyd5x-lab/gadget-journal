import { ArticleCard } from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">最新レビュー</h1>
        <p className="text-zinc-600 dark:text-zinc-300">Next.js + MDXで再構築したGadget Journal。</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            image={article.coverImage}
          />
        ))}
      </div>
    </section>
  );
}
