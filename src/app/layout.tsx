import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, GoogleAnalytics } from "@/components";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";
// システムフォントスタックを使用（Google Fontsアクセス不要、LCP改善）
const fontVariable = ""; // next/font/google はVercel本番でのみ有効

const BASE_URL = "https://gadget-journal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Gadget Journal - Apple製品の深掘りレビュー",
    template: "%s | Gadget Journal",
  },
  description:
    "iPhone、Mac、iPad、Apple Watch。Apple製品の革新を深掘りするレビューサイト。最新情報から実用的なガイドまで、あなたのAppleライフを充実させます。",
  keywords: ["Apple", "iPhone", "Mac", "iPad", "Apple Watch", "レビュー", "ガジェット"],
  authors: [{ name: "Gadget Journal" }],
  creator: "Gadget Journal",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "Gadget Journal",
    title: "Gadget Journal - Apple製品の深掘りレビュー",
    description: "Apple製品の革新を深掘りするレビューサイト",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Gadget Journal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gadget Journal",
    description: "Apple製品の深掘りレビュー",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`h-full antialiased ${fontVariable}`} suppressHydrationWarning>
      <head>
        {/* FOUC防止：マウント前にlocalStorageのテーマを適用しちらつきを防ぐ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans">
        <GoogleAnalytics />
        <ClerkProvider localization={jaJP}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClerkProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
