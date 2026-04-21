import { getArticles } from '@/lib/articles';
import { ArticleGlassCard, AdSenseArticle } from '@/components';

export const metadata = {
  title: '記事一覧 | Gadget Journal',
  description: 'Apple製品の最新レビュー、ガイド、深掘り解説。全記事一覧。',
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">記事一覧</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {articles.length}件のApple製品レビュー・ガイド
          </p>
        </div>
      </section>

      {/* Ad Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <AdSenseArticle />
      </section>

      {/* Articles by Category */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {categories.map((category, index) => {
          const categoryArticles = articles.filter((a) => a.category === category);
          return (
            <div key={category} className="mb-20">
              {index > 0 && index % 2 === 0 && (
                <div className="mb-16">
                  <AdSenseArticle />
                </div>
              )}
              <h2 className="text-3xl font-bold mb-8">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryArticles.map((article) => (
                  <ArticleGlassCard
                    key={article.slug}
                    title={article.title}
                    description={article.description}
                    category={article.category}
                    image={article.image}
                    href={`/articles/${article.slug}`}
                    date={new Date(article.date).toLocaleDateString('ja-JP')}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
