import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | Gadget Journal',
  description: 'Gadget Journalへのお問い合わせページです。',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 py-16">
      <h1 className="text-4xl font-bold mb-4">お問い合わせ</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10">
        ご質問・ご意見・取材・コラボレーションのご依頼など、お気軽にご連絡ください。
      </p>

      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="山田 太郎"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            件名
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="お問い合わせの件名"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            メッセージ <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            placeholder="お問い合わせ内容をご記入ください"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          送信する
        </button>
      </form>

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        ※ 通常3営業日以内にご返信いたします。お急ぎの場合はご了承ください。
      </p>
    </div>
  );
}
