'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
          🍎 Gadget Journal
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link href="/articles" className="transition-colors hover:text-orange-600">記事を探す</Link>
          <Link href="/categories" className="transition-colors hover:text-orange-600">カテゴリ</Link>
          <Link href="/about" className="transition-colors hover:text-orange-600">About</Link>
        </nav>
      </div>
    </header>
  );
}
