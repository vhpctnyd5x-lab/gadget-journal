import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 認証不要のパブリックルート
const isPublicRoute = createRouteMatcher([
  '/',
  '/articles(.*)',     // 記事ページ自体はアクセス可（部分表示で対応）
  '/category(.*)',
  '/about(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/public(.*)',
  '/sitemap.xml',
  '/feed.xml',
  '/robots.txt',
]);

export default clerkMiddleware(async (auth, req) => {
  // パブリックルート以外はログイン必須（将来の管理画面などに使用）
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
