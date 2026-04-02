import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), 'content', 'articles');

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
};

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const files = await fs.readdir(articlesDir);
  const articles = await Promise.all(
    files.filter((name) => name.endsWith('.mdx')).map(async (file) => {
      const source = await fs.readFile(path.join(articlesDir, file), 'utf8');
      const { data } = matter(source);
      return {
        slug: file.replace(/\.mdx$/, ''),
        title: String(data.title ?? ''),
        excerpt: String(data.excerpt ?? ''),
        date: String(data.date ?? ''),
        coverImage: String(data.coverImage ?? '/assets/DfMi0pbXqqGF.jpg')
      } satisfies ArticleMeta;
    })
  );

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleBySlug(slug: string) {
  const fullPath = path.join(articlesDir, `${slug}.mdx`);
  const source = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(source);
  return { data, content };
}
