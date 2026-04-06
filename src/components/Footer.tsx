import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-black text-white mt-20 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">🍎</span>
              Gadget Journal
            </h3>
            <p className="text-slate-400 text-sm">
              Apple製品の深掘りレビューと最新情報をお届けします。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">ナビゲーション</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/articles" className="hover:text-white transition-colors">記事一覧</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">カテゴリ</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">カテゴリ</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/category/mac" className="hover:text-white transition-colors">Mac</Link></li>
              <li><Link href="/category/ipad" className="hover:text-white transition-colors">iPad</Link></li>
              <li><Link href="/category/iphone" className="hover:text-white transition-colors">iPhone</Link></li>
              <li><Link href="/category/wearables" className="hover:text-white transition-colors">Apple Watch</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">サイト情報</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li>
                <a href="/feed.xml" className="hover:text-white transition-colors">
                  RSSフィード
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-white transition-colors">
                  サイトマップ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Gadget Journal. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            当サイトはApple Inc.とは無関係の独立したレビューサイトです。
          </p>
        </div>
      </div>
    </footer>
  );
};
