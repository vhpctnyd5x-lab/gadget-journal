import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: '記事を探す' },
  { href: '/categories', label: 'カテゴリ' },
  { href: '/about', label: 'About' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/85">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight">Gadget Journal</Link>
        <ul className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          {links.map((link) => (
            <li key={link.href}>
              <Link className="hover:text-zinc-950 dark:hover:text-white" href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
