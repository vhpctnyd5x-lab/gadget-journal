import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://gadget-journal.vercel.app';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/sign-in', '/sign-up', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
