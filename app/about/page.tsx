import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="space-y-10">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-200 p-8 dark:from-zinc-900 dark:to-zinc-800">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">About Gadget Journal</p>
        <h1 className="text-4xl font-bold tracking-tight">Apple製品の深掘りレビューを、わかりやすく。</h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">
          Gadget Journal は、運営者「諒大」がApple製品を中心に、実機体験や使い勝手を丁寧に解説するレビューサイトです。
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h2 className="text-2xl font-semibold">運営ポリシー</h2>
          <ul className="list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-200">
            <li>誇張を避け、日常利用での価値を重視します。</li>
            <li>良い点だけでなく、弱点や注意点も明記します。</li>
            <li>新製品発表後は、できるだけ早く更新します。</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Image
            src="/assets/CFkSueBqlWJp.jpg"
            alt="Gadget Journal team"
            width={900}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
