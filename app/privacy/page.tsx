export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <h1 className="text-4xl font-bold">プライバシーポリシー</h1>
      <p className="text-zinc-600 dark:text-zinc-300">Gadget Journalは、閲覧体験の改善に必要な最小限の情報のみを取り扱います。</p>
      <ul className="list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-200">
        <li>個人を特定できる情報を無断で第三者に提供しません。</li>
        <li>分析用途のデータは統計的に処理し、個人識別に利用しません。</li>
        <li>お問い合わせ情報は対応後に適切に管理します。</li>
      </ul>
    </div>
  );
}
