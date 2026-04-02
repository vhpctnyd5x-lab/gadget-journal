import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Gadget Journal',
  description: 'Gadget Journalは、Apple製品の深掘りレビューと最新情報をお届けするメディアです。',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-950 py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <div className="text-6xl mb-6">🍎</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Gadget Journal について</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Apple製品の深掘りレビューと最新情報をお届けするメディアです。
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
        <div className="space-y-12">

          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold mb-4">ミッション</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Gadget Journalは、iPhone・Mac・iPad・Apple Watchなど、
              Apple製品の革新を深掘りするレビューサイトです。
              最新情報から実用的なガイドまで、あなたのAppleライフを充実させる
              コンテンツをお届けします。
            </p>
          </div>

          {/* What We Cover */}
          <div>
            <h2 className="text-2xl font-bold mb-6">取り扱うトピック</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '💻', title: 'Mac', desc: 'MacBook Air/Pro、Mac Studio、Mac mini' },
                { icon: '📱', title: 'iPhone', desc: 'iPhone 17シリーズ、Apple Intelligence' },
                { icon: '🖥️', title: 'iPad', desc: 'iPad Pro、iPad Air、iPadOS' },
                { icon: '⌚', title: 'Wearables', desc: 'Apple Watch Ultra、AirPods Pro' },
                { icon: '🥽', title: 'Vision Pro', desc: '空間コンピューティングの未来' },
                { icon: '🤖', title: 'Apple Intelligence', desc: 'AppleのAI機能と活用法' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-3">お問い合わせ</h2>
            <p className="text-slate-600 dark:text-slate-400">
              ご質問・ご意見・コラボレーションのご相談は、サイトのフッターよりお気軽にご連絡ください。
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
