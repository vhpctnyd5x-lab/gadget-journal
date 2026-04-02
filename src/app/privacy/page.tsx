import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Gadget Journal',
  description: 'Gadget Journalのプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">プライバシーポリシー</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. 個人情報の収集について</h2>
          <p>Gadget Journal（以下「当サイト」）は、お問い合わせの際にお名前・メールアドレスなどの個人情報をご提供いただく場合があります。収集した個人情報は、お問い合わせへの回答のみに使用します。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. アクセス解析ツールについて</h2>
          <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用する場合があります。このツールはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Cookieについて</h2>
          <p>当サイトでは、一部のページでCookieを利用しています。Cookieとは、ウェブサーバーからブラウザに送信されるデータのことです。ブラウザの設定でCookieを無効にすることも可能ですが、一部の機能が使えなくなる場合があります。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. 免責事項</h2>
          <p>当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. プライバシーポリシーの変更</h2>
          <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直しその改善に努めます。</p>
        </section>
        <p className="text-sm text-slate-500">最終更新日：2026年4月</p>
      </div>
    </div>
  );
}
