export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <h1 className="text-4xl font-bold">利用規約</h1>
      <p className="text-zinc-600 dark:text-zinc-300">本サイトのコンテンツは、個人利用の範囲での閲覧を前提としています。</p>
      <ul className="list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-200">
        <li>転載・再配布は事前許可が必要です。</li>
        <li>掲載情報は正確性に配慮しますが、内容を保証するものではありません。</li>
        <li>外部リンク先の内容について当サイトは責任を負いません。</li>
      </ul>
    </div>
  );
}
