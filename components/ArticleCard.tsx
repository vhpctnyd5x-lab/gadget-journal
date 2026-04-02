import Image from 'next/image';
import Link from 'next/link';

export type ArticleCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category?: string;
};

export function ArticleCard({ slug, title, excerpt, image, category }: ArticleCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <Link href={`/articles/${slug}`} className="block">
        <Image src={image} alt={title} width={1200} height={630} className="h-48 w-full object-cover" />
        <div className="space-y-2 p-5">
          {category ? (
            <p className="text-xs font-medium uppercase tracking-wide text-sky-600 dark:text-sky-400">{category}</p>
          ) : null}
          <h2 className="text-lg font-semibold leading-tight">{title}</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
