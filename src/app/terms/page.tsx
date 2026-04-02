import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 | Gadget Journal',
  description: 'Gadget Journalの利用規約です。',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">利用規約</h1>
      <div className="space-y-8 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. はじめに</h2>
          <p>Gadget Journal（以下「当サイト」）をご利用いただく前に、以下の利用規約をよくお読みください。当サイトを利用することで、この規約に同意したものとみなします。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. 知的財産権</h2>
          <p>当サイト上のコンテンツ（テキスト、画像、デザイン等）の著作権は当サイト運営者に帰属します。無断での転載・複製・改変等を禁止します。ただし、出典を明記した上での引用は適切な範囲内で認めます。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. 禁止事項</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>当サイトのコンテンツの無断転載・複製</li>
            <li>当サイトを利用した違法行為</li>
            <li>他のユーザーへの迷惑行為</li>
            <li>当サイトの運営を妨害する行為</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. 免責事項</h2>
          <p>当サイトの情報は可能な限り正確を期していますが、内容の正確性・完全性・有用性について保証するものではありません。当サイトの利用によって生じたいかなる損害についても、当サイト運営者は一切の責任を負いません。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. リンクについて</h2>
          <p>当サイトへのリンクは自由です。ただし、当サイトからリンクしている外部サイトの内容については責任を負いません。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. 規約の変更</h2>
          <p>当サイトは、必要に応じて本規約を変更することがあります。変更後の規約はサイト上に掲示した時点で効力を生じるものとします。</p>
        </section>
        <p className="text-sm text-slate-500">最終更新日：2026年4月</p>
      </div>
    </div>
  );
}
