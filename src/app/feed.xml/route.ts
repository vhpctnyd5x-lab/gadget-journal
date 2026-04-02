import { getArticles } from '@/lib/articles';

export async function GET() {
  const articles = await getArticles();
  const baseUrl = 'https://gadget-journal.vercel.app';

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Gadget Journal</title>
    <link>${baseUrl}</link>
    <description>Apple製品の深掘りレビューと最新情報</description>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${articles
      .map(
        (article) => `
    <item>
      <title>${article.title}</title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <description>${article.description}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${article.category}</category>
      <author>${article.author}</author>
      <guid>${baseUrl}/articles/${article.slug}</guid>
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600',
    },
  });
}
