# Gadget Journal

Apple製品の深掘りレビューサイト。Next.js 15 (App Router) + Tailwind CSS + Clerk認証で構築。

## Tech Stack

| 分類 | 技術 |
|------|------|
| フレームワーク | Next.js 15 (App Router) |
| スタイリング | Tailwind CSS v4 + @tailwindcss/typography |
| 認証 | Clerk v7（Passkey / Email / Magic Link）|
| コンテンツ | JSON ファイル（`content/articles/*.json`）|
| デプロイ | Vercel |
| 分析 | Google Analytics 4 + Vercel Analytics |

## ローカル開発

```bash
# 1. リポジトリをクローン
git clone https://github.com/vhpctnyd5x-lab/gadget-journal.git
cd gadget-journal

# 2. 依存関係をインストール
npm install

# 3. 環境変数を設定
cp .env.example .env.local
# .env.local を編集して Clerk のキーを入力

# 4. 開発サーバーを起動
npm run dev
```

## 記事の追加方法

`content/articles/` に JSON ファイルを追加するだけで記事が公開されます。

```json
{
  "title": "製品名 レビュー",
  "description": "説明文（SEOに使用）",
  "category": "iPhone",
  "date": "2026-01-01",
  "author": "Gadget Journal",
  "image": "/images/product.jpg",
  "tags": ["iphone", "review"],
  "seoKeywords": ["iPhone レビュー", "A18チップ"],
  "rating": 4.5,
  "pros": ["良い点1", "良い点2"],
  "cons": ["気になる点1"],
  "specTable": [
    { "key": "チップ", "value": "A18" }
  ],
  "benchmarks": [
    { "name": "Geekbench 6 Single", "score": 3840, "competitorScore": 3420, "competitorName": "前世代" }
  ],
  "sections": [
    { "heading": "見出し", "text": "本文テキスト" }
  ]
}
```

## セキュリティ上の注意事項

### 環境変数の管理
- `.env.local` は `.gitignore` に含まれており、リポジトリにコミットされません
- 本番用のAPIキー（`pk_live_`, `sk_live_`）は Vercel の Environment Variables に設定してください
- テスト用キー（`pk_test_`, `sk_test_`）はローカル開発専用です

### Vercel プレビューURLについて
- Vercel のプレビューデプロイ URL（`*.vercel.app` のサブドメイン）は外部に漏洩しないよう注意してください
- プレビューURLを含むメールやメッセージは、信頼できる相手にのみ共有してください
- Vercel ダッシュボードの **Settings → Deployment Protection** でプレビューへのアクセスを保護することを推奨します

### Clerk の設定
- 本番環境では Clerk ダッシュボードで **Allowed redirect URLs** を `https://gadget-journal.vercel.app/*` に限定してください
- Passkeys を有効にする場合は Clerk ダッシュボードの **Configure → User & Authentication → Passkeys** から設定してください

## CI/CD

- **Lighthouse CI**: `main`/`master` ブランチへのpush・PRで自動実行
- **Dependabot**: 毎週月曜日にnpmパッケージとGitHub Actionsを自動更新
- **Vercel**: `main`ブランチへのpushで自動デプロイ

## ライセンス

MIT License — ただし記事コンテンツおよび画像は含みません。
