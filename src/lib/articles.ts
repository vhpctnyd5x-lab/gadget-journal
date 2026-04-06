import { promises as fs } from 'fs';
import path from 'path';

export interface SpecRow {
  key: string;
  value: string;
}

export interface BenchmarkRow {
  name: string;
  score: number;
  competitorScore?: number;
  competitorName?: string;
  unit?: string;
}

export interface ArticleSection {
  heading: string;
  text: string;
}

export interface ArticleData {
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  // SEO
  seoKeywords?: string[];
  // Review fields
  rating?: number;
  pros?: string[];
  cons?: string[];
  // Spec / benchmark tables
  specTable?: SpecRow[];
  benchmarks?: BenchmarkRow[];
  // Body
  sections: ArticleSection[];
}

export interface Article extends ArticleData {
  slug: string;
}

const articlesDir = path.join(process.cwd(), 'content/articles');

export async function getArticleSlugs(): Promise<string[]> {
  const files = await fs.readdir(articlesDir);
  return files
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(articlesDir, `${slug}.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const data: ArticleData = JSON.parse(raw);
    return { slug, ...data };
  } catch {
    return null;
  }
}

export async function getArticles(): Promise<Article[]> {
  const slugs = await getArticleSlugs();
  const articles = await Promise.all(slugs.map((slug) => getArticleBySlug(slug)));
  const valid = articles.filter((a): a is Article => a !== null);
  return valid.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const all = await getArticles();
  return all.filter((a) => a.category === category);
}

export async function getRelatedArticles(slug: string, limit = 3): Promise<Article[]> {
  const article = await getArticleBySlug(slug);
  if (!article) return [];
  const all = await getArticles();
  return all
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, limit);
}
