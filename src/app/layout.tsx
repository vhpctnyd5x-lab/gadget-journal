import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Gadget Journal - Apple製品の深掘りレビュー",
  description: "iPhone、Mac、iPad、Apple Watch。Apple製品の革新を深掘りするレビューサイト。最新情報から実用的なガイドまで、あなたのAppleライフを充実させます。",
  keywords: "Apple, iPhone, Mac, iPad, Apple Watch, Review, ガジェット",
  metadataBase: new URL("https://gadget-journal.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
  verification: {
    google: "googledbb0557aed1880c4",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://gadget-journal.vercel.app",
    title: "Gadget Journal",
    description: "Apple製品の深掘りレビュー",
    siteName: "Gadget Journal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gadget Journal",
    description: "Apple製品の深掘りレビュー",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2381870019821878"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H5S1Q8K2XY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H5S1Q8K2XY');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
