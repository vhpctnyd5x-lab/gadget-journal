import { redirect } from 'next/navigation';

export default async function LegacyBlogRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/articles/${slug}`);
}
