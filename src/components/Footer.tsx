import React from 'react';

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

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">ナビゲーション</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/articles" className="hover:text-white transition-colors">記事一覧</a></li>
              <li><a href="/categories" className="hover:text-white transition-colors">カテゴリ</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">カテゴリ</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/category/mac" className="hover:text-white transition-colors">Mac</a></li>
              <li><a href="/category/ipad" className="hover:text-white transition-colors">iPad</a></li>
              <li><a href="/category/iphone" className="hover:text-white transition-colors">iPhone</a></li>
              <li><a href="/category/wearables" className="hover:text-white transition-colors">Wearables</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">法律</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">利用規約</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">お問い合わせ</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Gadget Journal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
