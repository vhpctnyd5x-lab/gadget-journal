import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMeta {
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export interface Article extends ArticleMeta {
  slug: string;
  content: string;
}

const articlesDir = path.join(process.cwd(), 'content/articles');

export async function getArticles(): Promise<Article[]> {
  const files = await fs.readdir(articlesDir);
  const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

  const articles = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(articlesDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const { data, content: mdxContent } = matter(content);

      return {
        slug,
        ...(data as ArticleMeta),
        content: mdxContent,
      };
    })
  );

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(articlesDir, `${slug}.mdx`);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: mdxContent } = matter(content);

    return {
      slug,
      ...(data as ArticleMeta),
      content: mdxContent,
    };
  } catch (error) {
    return null;
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter((article) => article.category === category);
}

export async function getRelatedArticles(slug: string, limit = 3): Promise<Article[]> {
  const article = await getArticleBySlug(slug);
  if (!article) return [];

  const allArticles = await getArticles();
  return allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, limit);
}
