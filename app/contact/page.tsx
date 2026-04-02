export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <h1 className="text-4xl font-bold">お問い合わせ</h1>
      <p className="text-zinc-600 dark:text-zinc-300">取材依頼、記事の誤り報告、コラボ相談は以下までご連絡ください。</p>
      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <p className="font-medium">Email: contact@gadget-journal.example</p>
        <p className="mt-2 text-sm text-zinc-500">通常3営業日以内に返信します。</p>
      </div>
    </div>
  );
}
