import { Article } from '@/lib/articles';

export function ArticleStructuredData({ article }: { article: Article }) {
  const baseUrl = 'https://gadget-journal.vercel.app';
  const articleUrl = `${baseUrl}/articles/${article.slug}`;
  const categorySlug = article.category.toLowerCase().replace(/\s+/g, '-');
  const categoryUrl = `${baseUrl}/category/${categorySlug}`;

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': articleUrl,
    headline: article.title,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: article.image,
      width: 1200,
      height: 630,
      name: article.title,
    },
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gadget Journal',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.png`,
        width: 60,
        height: 60,
      },
    },
    articleBody: article.content,
    keywords: article.tags ? article.tags.join(', ') : 'Apple, \u30ac\u30b8\u30a7\u30c3\u30c8',
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: `${baseUrl}/articles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.category,
        item: categoryUrl,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gadget Journal',
    url: baseUrl,
    logo: `${baseUrl}/favicon.png`,
    sameAs: [
      'https://twitter.com/gadgetjournal',
      'https://www.instagram.com/gadgetjournal',
    ],
  };

  const escapeJson = (schema: unknown) => {
    const json = JSON.stringify(schema);
    return json
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026')
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJson(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJson(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJson(organizationSchema) }}
      />
    </>
  );
}
