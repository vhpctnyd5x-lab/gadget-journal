import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance & Optimization
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  optimizePackageImports: ["@components", "@utils"],

  // Image Optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.gadget-journal.com",
      },
      {
        protocol: "https",
        hostname: "cdn.gadget-journal.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Security Headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "X-XSS-Protection",
            value: "0",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Root
      { source: '/index.html', destination: '/', permanent: true },

      // Legal pages
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },

      // Mac articles
      { source: '/macbook-pro.html', destination: '/articles/macbook-pro-m5', permanent: true },
      { source: '/macbook-pro-m4-pro.html', destination: '/articles/macbook-pro-m5', permanent: true },
      { source: '/macbook-neo.html', destination: '/articles/macbook-neo', permanent: true },
      { source: '/m5-macbook-air.html', destination: '/articles/macbook-air-m5', permanent: true },
      { source: '/m5-macbook-air-review.html', destination: '/articles/macbook-air-m5', permanent: true },
      { source: '/mac-mini.html', destination: '/articles/mac-mini-m4', permanent: true },
      { source: '/mac-mini-m4-desk-tour.html', destination: '/articles/mac-mini-m4', permanent: true },
      { source: '/mac-mini-redesign.html', destination: '/articles/mac-mini-m4', permanent: true },
      { source: '/mac-studio.html', destination: '/articles/mac-studio-m4', permanent: true },
      { source: '/mac-studio-m4-ultra.html', destination: '/articles/mac-studio-m4', permanent: true },

      // iPhone articles
      { source: '/iphone.html', destination: '/category/iphone', permanent: true },
      { source: '/iphone-17e.html', destination: '/articles/iphone-17e', permanent: true },
      { source: '/iphone-17e-vs-se.html', destination: '/articles/iphone-17e', permanent: true },
      { source: '/iphone-17-pro-max-camera.html', destination: '/articles/iphone-17-pro', permanent: true },
      { source: '/iphone-17-pro-vs-17e-guide.html', destination: '/articles/iphone-17-pro', permanent: true },
      { source: '/iphone-battery-care.html', destination: '/articles/iphone-17e', permanent: true },
      { source: '/iphone-magsafe-accessories.html', destination: '/articles/iphone-17e', permanent: true },

      // iPad articles
      { source: '/ipad.html', destination: '/category/ipad', permanent: true },
      { source: '/ipad-air.html', destination: '/articles/ipad-air-m4', permanent: true },
      { source: '/ipad-air-m4.html', destination: '/articles/ipad-air-m4', permanent: true },
      { source: '/ipad-for-creators.html', destination: '/articles/ipad-pro-m5', permanent: true },
      { source: '/ipad-pro-m5-oled.html', destination: '/articles/ipad-pro-m5', permanent: true },
      { source: '/ipad-pro-pencil-workspace.html', destination: '/articles/ipad-pro-m5', permanent: true },
      { source: '/ipados-19-multitasking.html', destination: '/articles/ios-19', permanent: true },

      // Apple Watch / Wearables
      { source: '/apple-watch.html', destination: '/category/wearables', permanent: true },
      { source: '/apple-watch-ultra-3.html', destination: '/articles/apple-watch-ultra-3', permanent: true },
      { source: '/apple-watch-series-11.html', destination: '/articles/apple-watch-ultra-3', permanent: true },
      { source: '/apple-watch-ultra-3-daily-use.html', destination: '/articles/apple-watch-ultra-3', permanent: true },
      { source: '/airpods.html', destination: '/articles/airpods-pro-3', permanent: true },
      { source: '/airpods-pro-3.html', destination: '/articles/airpods-pro-3', permanent: true },
      { source: '/airpods-pro-3-noise-cancel-test.html', destination: '/articles/airpods-pro-3', permanent: true },

      // Vision Pro
      { source: '/vision-pro.html', destination: '/articles/vision-pro', permanent: true },
      { source: '/vision-pro-2-rumors.html', destination: '/articles/vision-pro', permanent: true },
      { source: '/experience.html', destination: '/articles/vision-pro', permanent: true },

      // Apple Intelligence / Software
      { source: '/apple-intelligence.html', destination: '/articles/apple-intelligence', permanent: true },
      { source: '/apple-intelligence-workflow.html', destination: '/articles/apple-intelligence', permanent: true },
      { source: '/ios-19-apple-intelligence-tips.html', destination: '/articles/ios-19', permanent: true },
      { source: '/ios-19-rumors.html', destination: '/articles/ios-19', permanent: true },
      { source: '/macos-16-preview.html', destination: '/articles/macos-sequoia', permanent: true },

      // Ecosystem / Security / History
      { source: '/security.html', destination: '/articles/apple-security', permanent: true },
      { source: '/history.html', destination: '/articles/apple-history', permanent: true },
      { source: '/apple-ecosystem-benefits.html', destination: '/articles/apple-ecosystem', permanent: true },
      { source: '/apple-one-value.html', destination: '/articles/apple-ecosystem', permanent: true },
      { source: '/why-i-love-apple-ecosystem.html', destination: '/articles/apple-ecosystem', permanent: true },
      { source: '/smart-home-matter-apple.html', destination: '/articles/apple-ecosystem', permanent: true },
      { source: '/old-device-trade-in-guide.html', destination: '/articles/apple-history', permanent: true },

      // HomePod / Music
      { source: '/homepod.html', destination: '/articles', permanent: true },
      { source: '/homepod-with-display.html', destination: '/articles', permanent: true },
      { source: '/music.html', destination: '/articles', permanent: true },
      { source: '/music-trend.html', destination: '/articles', permanent: true },

      // iCloud
      { source: '/icloud-plus-features.html', destination: '/articles', permanent: true },
      { source: '/icloud-plus-storage-family-guide.html', destination: '/articles', permanent: true },

      // Reviews / Other
      { source: '/review.html', destination: '/articles', permanent: true },
      { source: '/apple-pencil-pro-tips.html', destination: '/articles/ipad-pro-m5', permanent: true },

      // Category pages
      { source: '/category/:slug', destination: '/category/:slug', permanent: false },
    ];
  },
};

export default nextConfig;
