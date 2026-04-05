import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components";
import { ClerkProvider } from "@clerk/nextjs";
import { jaJP } from "@clerk/localizations";

export const metadata: Metadata = {
  title: "Gadget Journal - Apple製品の深掘りレビュー",
  description: "iPhone、Mac、iPad、Apple Watch。Apple製品の革新を深掘りするレビューサイト。最新情報から実用的なガイドまで、あなたのAppleライフを充実させます。",
  keywords: "Apple, iPhone, Mac, iPad, Apple Watch, Review, ガジェット",
  metadataBase: new URL("https://gadget-journal.vercel.app"),
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
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <ClerkProvider localization={jaJP}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
