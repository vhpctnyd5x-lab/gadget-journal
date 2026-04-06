import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';

const BASE_URL = 'https://gadget-journal.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ];

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
