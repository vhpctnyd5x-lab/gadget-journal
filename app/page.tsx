import { ArticleCard } from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';

export default async function HomePage() {
  const articles = await getAllArticles();
  const featured = articles[0];

  return (
    <section className="space-y-8">
      <div className="space-y-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">Editor's Pick</p>
        <h1 className="text-4xl font-bold tracking-tight">最新レビュー</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-300">
          Apple製品の実用レビューを中心に、購入判断に役立つ情報を短時間で把握できるように整理しています。
        </p>
        {featured ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            注目記事: <span className="font-medium text-zinc-700 dark:text-zinc-200">{featured.title}</span>
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"><p className="text-xs text-zinc-500">記事数</p><p className="text-2xl font-bold">{articles.length}</p></div>
        <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"><p className="text-xs text-zinc-500">カテゴリ</p><p className="text-2xl font-bold">{new Set(articles.map((a) => a.category)).size}</p></div>
        <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"><p className="text-xs text-zinc-500">更新頻度</p><p className="text-2xl font-bold">Weekly</p></div>
        <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800"><p className="text-xs text-zinc-500">運営</p><p className="text-2xl font-bold">諒大</p></div>
      </div>

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
