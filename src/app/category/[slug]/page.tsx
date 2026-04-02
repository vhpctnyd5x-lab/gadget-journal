import { getArticles } from '@/lib/articles';
import { ArticleGlassCard } from '@/components';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function slugToCategory(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

export async function generateStaticParams() {
  const articles = await getArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return categories.map((category) => ({
    slug: categoryToSlug(category),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) {
    return {
      title: 'Category | Gadget Journal',
    };
  }
  const categoryName = slugToCategory(slug);
  return {
    title: `${categoryName} | Gadget Journal`,
    description: `${categoryName}カテゴリの記事一覧`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const allArticles = await getArticles();
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return <div>Category not found</div>;
  }

  const categoryName = slugToCategory(slug);
  const articles = allArticles.filter((a) => categoryToSlug(a.category) === slug);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <Link href="/articles" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
            ← 全記事に戻る
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{categoryName}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">{articles.length}件の記事</p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
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
      </section>
    </>
  );
}
