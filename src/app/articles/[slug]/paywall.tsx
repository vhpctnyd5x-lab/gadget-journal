'use client';

import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function ArticlePaywall() {
  return (
    <div className="relative mt-0">
      {/* グラデーションのフェードアウト */}
      <div className="h-32 -mt-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />

      {/* ペイウォールカード */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-8 sm:p-10 text-center bg-white dark:bg-slate-900 shadow-lg">
        {/* アイコン */}
        <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
          続きを読むには登録が必要です
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
          無料アカウントを作成すると、すべての記事を全文読むことができます。
          パスキー対応で、パスワード不要で安全にログインできます。
        </p>

        {/* 特典リスト */}
        <ul className="text-left max-w-xs mx-auto mb-8 space-y-2 text-sm text-slate-600 dark:text-slate-400">
          {[
            '全記事の全文を無制限に読める',
            'パスキー対応（パスワード不要）',
            '新着記事の通知',
            '完全無料',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        {/* CTAボタン */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <SignUpButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-md hover:shadow-lg">
              無料で登録して全文を読む
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              すでにアカウントをお持ちの方
            </button>
          </SignInButton>
        </div>

        {/* パスキーの説明 */}
        <p className="mt-5 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          Face ID・Touch ID・デバイスPINでログインできるパスキーに対応
        </p>
      </div>
    </div>
  );
}
