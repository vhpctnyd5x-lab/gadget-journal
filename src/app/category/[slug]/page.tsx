import { getArticles } from '@/lib/articles';
import { ArticleGlassCard } from '@/components';
import Link from 'next/link';

function slugToCategory(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

const categoryDescriptions: Record<string, string> = {
  'Mac': 'MacBook Pro、MacBook Air、Mac Studio、Mac Miniなど、最新のMacコンピュータに関する詳細なレビューとガイド。パフォーマンス、スペック、使用シーン別の選び方を網羅しています。',
  'iPhone': 'iPhone 17 Pro、iPhone SE など最新iPhoneモデルの詳細レビュー。カメラ性能、バッテリー、デザイン、比較ガイドを掲載。',
  'iPad': 'iPad Pro、iPad Air、iPad miniの詳細レビュー。クリエイター向け機能、ApplePencil、キーボード活用法を解説。',
  'Audio': 'AirPods Max、AirPods Pro、その他オーディオ製品の音質レビュー。ノイズキャンセリング、空間オーディオの詳細解説。',
  'Wearables': 'Apple Watch、Apple Watch Ultra、その他ウェアラブルデバイスのレビュー。健康機能、フィットネス、日常使用ガイド。',
  'Ecosystem': 'Apple エコシステムの統合機能、iCloud、Apple One。複数デバイス間の連携方法と活用ガイド。',
  'Software': 'iOS、macOS、iPadOS の最新機能レビュー。Apple Intelligence、アップデート情報、活用ガイド。',
  'Other': 'Vision Pro、Apple TV、その他の Apple 製品およびサービスのレビュー。',
};

export async function generateStaticParams() {
  const articles = await getArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));
  return categories.map((category) => ({
    slug: categoryToSlug(category),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = slugToCategory(slug);
  const allArticles = await getArticles();
  const categoryArticles = allArticles.filter((article) => categoryToSlug(article.category) === slug);
  const description = categoryDescriptions[categoryName] || `${categoryName}カテゴリの記事一覧。${categoryArticles.length}件の記事を掲載しています。`;

  const url = `https://gadget-journal.vercel.app/category/${slug}`;

  return {
    title: `${categoryName} | Gadget Journal`,
    description: description,
    keywords: `${categoryName}, Apple, ガジェット, レビュー`,
    openGraph: {
      title: `${categoryName} | Gadget Journal`,
      description: description,
      url: url,
      type: 'website',
    },
    robots: 'index, follow',
    canonical: url,
  };
}

function CategoryStructuredData({ categoryName, articleCount }: { categoryName: string; articleCount: number }) {
  const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
  const baseUrl = 'https://gadget-journal.vercel.app';
  const url = `${baseUrl}/category/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} | Gadget Journal`,
    description: `${categoryName}カテゴリの記事一覧。${articleCount}件の記事を掲載しています。`,
    url: url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articleCount,
    },
  };

  const json = JSON.stringify(schema)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allArticles = await getArticles();

  const categoryName = slugToCategory(slug);
  const articles = allArticles.filter((article) => {
    return categoryToSlug(article.category) === slug;
  });

  return (
    <>
      <CategoryStructuredData categoryName={categoryName} articleCount={articles.length} />

      <section className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <Link href="/categories" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
            ← カテゴリに戻る
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{categoryName}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">{articles.length}件の記事</p>
        </div>
      </section>

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
