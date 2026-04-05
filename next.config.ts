import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/macbook-pro.html', destination: '/articles/macbook-pro-m5', permanent: true },
      { source: '/iphone-17e.html', destination: '/articles/iphone-17e', permanent: true },
      { source: '/iphone-17-pro.html', destination: '/articles/iphone-17-pro', permanent: true },
      { source: '/ipad-pro.html', destination: '/articles/ipad-pro-m5', permanent: true },
      { source: '/ipad-air.html', destination: '/articles/ipad-air-m4', permanent: true },
      { source: '/apple-watch-ultra.html', destination: '/articles/apple-watch-ultra-3', permanent: true },
      { source: '/airpods-pro.html', destination: '/articles/airpods-pro-3', permanent: true },
      { source: '/vision-pro.html', destination: '/articles/vision-pro', permanent: true },
      { source: '/mac-mini.html', destination: '/articles/mac-mini-m4', permanent: true },
      { source: '/mac-studio.html', destination: '/articles/mac-studio-m4', permanent: true },
      { source: '/macbook-air.html', destination: '/articles/macbook-air-m5', permanent: true },
      { source: '/ios-19.html', destination: '/articles/ios-19', permanent: true },
      { source: '/macos-sequoia.html', destination: '/articles/macos-sequoia', permanent: true },
      { source: '/apple-intelligence.html', destination: '/articles/apple-intelligence', permanent: true },
      { source: '/apple-security.html', destination: '/articles/apple-security', permanent: true },
      { source: '/apple-ecosystem.html', destination: '/articles/apple-ecosystem', permanent: true },
      { source: '/apple-history.html', destination: '/articles/apple-history', permanent: true },
    ];
  },
};

export default nextConfig;
