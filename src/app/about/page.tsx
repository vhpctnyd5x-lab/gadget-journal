import type { Metadata } from 'next';
import Link from 'next/link';

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
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 border border-blue-200/30 dark:border-blue-800/30">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl">🎯</span> ミッション
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Gadget Journal</span> は、iPhone・Mac・iPad・Apple Watchなど、
              Apple製品の革新を深掘りするレビューサイトです。
              <br/><br/>
              最新情報から実用的なガイドまで、あなたのAppleライフを充実させる
              コンテンツをお届けします。私たちは、Appleテクノロジーが人々の生活にもたらす
              価値を、できるだけ多くの人に伝えることを目指しています。
            </p>
          </div>

          {/* What We Cover */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">🔍</span> 取り扱うトピック
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: '💻', title: 'Mac', slug: 'mac', desc: 'MacBook Air/Pro、Mac Studio、Mac mini', classNames: 'bg-gradient-to-br from-slate-100 dark:from-slate-800 to-white/50 dark:to-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700' },
                { icon: '📱', title: 'iPhone', slug: 'iphone', desc: 'iPhone 17シリーズ、Apple Intelligence', classNames: 'bg-gradient-to-br from-blue-100 dark:from-blue-900/50 to-white/50 dark:to-slate-900/50 border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700' },
                { icon: '🖥️', title: 'iPad', slug: 'ipad', desc: 'iPad Pro、iPad Air、iPadOS', classNames: 'bg-gradient-to-br from-purple-100 dark:from-purple-900/50 to-white/50 dark:to-slate-900/50 border border-purple-200/50 dark:border-purple-800/50 hover:border-purple-300 dark:hover:border-purple-700' },
                { icon: '⌚', title: 'Wearables', slug: 'wearables', desc: 'Apple Watch Ultra、AirPods Pro', classNames: 'bg-gradient-to-br from-green-100 dark:from-green-900/50 to-white/50 dark:to-slate-900/50 border border-green-200/50 dark:border-green-800/50 hover:border-green-300 dark:hover:border-green-700' },
                { icon: '🥽', title: 'Spatial', slug: 'spatial', desc: '空間コンピューティングの未来', classNames: 'bg-gradient-to-br from-pink-100 dark:from-pink-900/50 to-white/50 dark:to-slate-900/50 border border-pink-200/50 dark:border-pink-800/50 hover:border-pink-300 dark:hover:border-pink-700' },
                { icon: '🧠', title: 'Software', slug: 'software', desc: 'iOS・macOS・Apple Intelligenceの最新機能', classNames: 'bg-gradient-to-br from-cyan-100 dark:from-cyan-900/50 to-white/50 dark:to-slate-900/50 border border-cyan-200/50 dark:border-cyan-800/50 hover:border-cyan-300 dark:hover:border-cyan-700' },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={`/category/${item.slug}`}
                  className={`group flex items-start gap-4 p-6 rounded-xl ${item.classNames} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-grow">
                    <div className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { number: '41+', label: '記事数', icon: '📄' },
              { number: '10', label: 'カテゴリ', icon: '🏷️' },
              { number: '∞', label: '愛する理由', icon: '❤️' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:via-blue-500/20 dark:to-cyan-500/20 border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💬</div>
              <div>
                <h2 className="text-2xl font-bold mb-3">お問い合わせ</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-4">
                  ご質問・ご意見・コラボレーションのご相談は、サイトのフッターよりお気軽にご連絡ください。
                  Apple製品についてのご質問や、記事リクエストもお待ちしています！
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  お問い合わせフォーム →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
