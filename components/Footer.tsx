import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
      <div className="mb-3 flex items-center justify-center gap-4">
        <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100">About</Link>
        <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100">Privacy</Link>
        <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100">Terms</Link>
        <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100">Contact</Link>
      </div>
      <p>© 2026 Gadget Journal</p>
    </footer>
  );
}
