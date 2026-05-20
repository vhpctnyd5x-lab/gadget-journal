import { notFound, redirect } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/articles';

const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  iphone: '/category/iphone',
  ipad: '/category/ipad',
  'apple-watch': '/category/wearables',
  wearables: '/category/wearables',
  mac: '/category/mac',
  software: '/category/software',
  spatial: '/category/spatial',
  security: '/articles/apple-security',
  history: '/articles/apple-history',
  'vision-pro': '/articles/vision-pro',
};

function normalizeSlug(rawSlug: string): string {
  return rawSlug.replace(/\.html$/i, '').toLowerCase();
}

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

export default async function LegacySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);

  const mappedDestination = LEGACY_SLUG_REDIRECTS[normalizedSlug];
  if (mappedDestination) {
    redirect(mappedDestination);
  }

  const article = await getArticleBySlug(normalizedSlug);
  if (article) {
    redirect(`/articles/${article.slug}`);
  }

  const articles = await getArticles();
  const categories = new Set(articles.map((articleMeta) => categoryToSlug(articleMeta.category)));
  if (categories.has(normalizedSlug)) {
    redirect(`/category/${normalizedSlug}`);
  }

  notFound();
}
