export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-16">
      <h1 className="mb-8 text-5xl font-bold">About Gadget Journal</h1>

      <div className="prose text-lg leading-relaxed dark:prose-invert">
        <p>諒大が運営するApple製品専門の深掘りレビューサイトです。</p>
        <p>iPhone、Mac、Apple Watch、Vision Proなど、最新のApple製品について、スペックだけでなく「実際に使ってみてどうか」を中心に丁寧に解説しています。</p>
        <p>特にApple Intelligenceや将来の技術動向にも注目し、単なるニュースではなく「本質」を伝えることを目指しています。</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"><p className="text-xs text-zinc-500">レビュー方針</p><p className="mt-2 font-medium">実使用ベースで評価</p></div>
        <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"><p className="text-xs text-zinc-500">重点テーマ</p><p className="mt-2 font-medium">Apple Intelligence / 生産性</p></div>
        <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"><p className="text-xs text-zinc-500">更新</p><p className="mt-2 font-medium">週次＋新製品時は随時</p></div>
      </div>

      <div className="border-t border-zinc-200 pt-10 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">運営：諒大（Tokyo, Japan）</p>
        <p className="text-sm text-zinc-500">最終更新：2026年4月</p>
      </div>
    </div>
  );
}
