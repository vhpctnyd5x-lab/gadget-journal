#!/usr/bin/env node
/**
 * Generates Apple-style product hero images for each article
 * using sharp + SVG compositing
 */
import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

// Category → color scheme
const CATEGORY_THEMES = {
  iPhone:    { bg1: '#0a1628', bg2: '#1a3a5c', accent: '#2997ff', icon: 'iphone' },
  Mac:       { bg1: '#111111', bg2: '#2c2c2e', accent: '#86868b', icon: 'mac' },
  iPad:      { bg1: '#1a0a3a', bg2: '#2d1b69', accent: '#7b5ea7', icon: 'ipad' },
  Audio:     { bg1: '#0a1f1f', bg2: '#0d3535', accent: '#30d158', icon: 'airpods' },
  Wearables: { bg1: '#0a1f0a', bg2: '#1a3a1a', accent: '#30d158', icon: 'watch' },
  Software:  { bg1: '#0a0a1f', bg2: '#1c1c3a', accent: '#bf5af2', icon: 'software' },
  History:   { bg1: '#1f1500', bg2: '#3a2800', accent: '#ffd60a', icon: 'apple' },
  Security:  { bg1: '#1a0000', bg2: '#2c1010', accent: '#ff453a', icon: 'shield' },
  Spatial:   { bg1: '#000a1f', bg2: '#001a3a', accent: '#64d2ff', icon: 'vision' },
  Ecosystem: { bg1: '#001a14', bg2: '#00332a', accent: '#30d158', icon: 'ecosystem' },
};

// SVG product icons (clean line art, Apple-style)
const ICONS = {
  iphone: `
    <rect x="310" y="60" width="180" height="330" rx="28" ry="28" fill="none" stroke="COLOR" stroke-width="3" opacity="0.9"/>
    <rect x="325" y="75" width="150" height="285" rx="16" ry="16" fill="COLOR" opacity="0.08"/>
    <rect x="370" y="67" width="60" height="8" rx="4" fill="COLOR" opacity="0.5"/>
    <circle cx="400" cy="373" r="10" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.6"/>
  `,
  mac: `
    <rect x="220" y="100" width="360" height="220" rx="10" fill="none" stroke="COLOR" stroke-width="3" opacity="0.9"/>
    <rect x="235" y="112" width="330" height="196" rx="4" fill="COLOR" opacity="0.08"/>
    <rect x="180" y="325" width="440" height="18" rx="6" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.7"/>
    <rect x="320" y="318" width="160" height="8" rx="4" fill="COLOR" opacity="0.4"/>
  `,
  ipad: `
    <rect x="285" y="55" width="230" height="340" rx="22" fill="none" stroke="COLOR" stroke-width="3" opacity="0.9"/>
    <rect x="298" y="70" width="204" height="290" rx="10" fill="COLOR" opacity="0.08"/>
    <circle cx="400" cy="378" r="9" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.6"/>
    <rect x="278" y="210" width="8" height="40" rx="4" fill="COLOR" opacity="0.5"/>
  `,
  airpods: `
    <ellipse cx="340" cy="200" rx="40" ry="60" fill="none" stroke="COLOR" stroke-width="3" opacity="0.85"/>
    <ellipse cx="460" cy="200" rx="40" ry="60" fill="none" stroke="COLOR" stroke-width="3" opacity="0.85"/>
    <line x1="340" y1="260" x2="340" y2="320" stroke="COLOR" stroke-width="3" opacity="0.7"/>
    <line x1="460" y1="260" x2="460" y2="320" stroke="COLOR" stroke-width="3" opacity="0.7"/>
    <ellipse cx="340" cy="175" rx="20" ry="28" fill="COLOR" opacity="0.12"/>
    <ellipse cx="460" cy="175" rx="20" ry="28" fill="COLOR" opacity="0.12"/>
  `,
  watch: `
    <rect x="340" y="60" width="120" height="30" rx="12" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.6"/>
    <rect x="340" y="360" width="120" height="30" rx="12" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.6"/>
    <rect x="310" y="130" width="180" height="200" rx="46" fill="none" stroke="COLOR" stroke-width="3" opacity="0.9"/>
    <rect x="325" y="145" width="150" height="170" rx="36" fill="COLOR" opacity="0.1"/>
    <circle cx="400" cy="230" r="2.5" fill="COLOR" opacity="0.8"/>
    <line x1="400" y1="230" x2="400" y2="200" stroke="COLOR" stroke-width="2" opacity="0.8"/>
    <line x1="400" y1="230" x2="422" y2="230" stroke="COLOR" stroke-width="2" opacity="0.6"/>
  `,
  software: `
    <rect x="230" y="100" width="340" height="240" rx="12" fill="none" stroke="COLOR" stroke-width="3" opacity="0.9"/>
    <rect x="244" y="120" width="312" height="28" rx="4" fill="COLOR" opacity="0.15"/>
    <circle cx="258" cy="134" r="6" fill="COLOR" opacity="0.5"/>
    <circle cx="275" cy="134" r="6" fill="COLOR" opacity="0.5"/>
    <circle cx="292" cy="134" r="6" fill="COLOR" opacity="0.5"/>
    <rect x="260" y="168" width="180" height="8" rx="4" fill="COLOR" opacity="0.4"/>
    <rect x="260" y="188" width="260" height="8" rx="4" fill="COLOR" opacity="0.3"/>
    <rect x="260" y="208" width="220" height="8" rx="4" fill="COLOR" opacity="0.3"/>
    <rect x="260" y="228" width="240" height="8" rx="4" fill="COLOR" opacity="0.3"/>
    <rect x="260" y="268" width="80" height="28" rx="14" fill="COLOR" opacity="0.3"/>
  `,
  apple: `
    <path d="M400 80 C360 80 320 120 320 165 C320 200 340 230 360 250 C340 265 325 285 325 310 C325 360 370 400 400 400 C430 400 475 360 475 310 C475 285 460 265 440 250 C460 230 480 200 480 165 C480 120 440 80 400 80 Z" fill="none" stroke="COLOR" stroke-width="3" opacity="0.85"/>
    <circle cx="400" cy="75" r="12" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.6"/>
    <line x1="400" y1="63" x2="415" y2="48" stroke="COLOR" stroke-width="2.5" opacity="0.6"/>
  `,
  shield: `
    <path d="M400 80 L470 115 L470 230 C470 290 435 340 400 365 C365 340 330 290 330 230 L330 115 Z" fill="none" stroke="COLOR" stroke-width="3" opacity="0.9"/>
    <path d="M400 100 L455 130 L455 228 C455 278 425 320 400 342 C375 320 345 278 345 228 L345 130 Z" fill="COLOR" opacity="0.1"/>
    <path d="M375 225 L392 245 L428 208" fill="none" stroke="COLOR" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
  `,
  vision: `
    <path d="M260 215 C260 175 295 145 340 145 L460 145 C505 145 540 175 540 215 C540 255 505 285 460 285 L340 285 C295 285 260 255 260 215 Z" fill="none" stroke="COLOR" stroke-width="3" opacity="0.9"/>
    <circle cx="363" cy="215" r="42" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.8"/>
    <circle cx="437" cy="215" r="42" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.8"/>
    <circle cx="363" cy="215" r="28" fill="COLOR" opacity="0.1"/>
    <circle cx="437" cy="215" r="28" fill="COLOR" opacity="0.1"/>
    <line x1="405" y1="215" x2="395" y2="215" stroke="COLOR" stroke-width="2" opacity="0.5"/>
  `,
  ecosystem: `
    <circle cx="400" cy="215" r="80" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.7"/>
    <circle cx="400" cy="215" r="140" fill="none" stroke="COLOR" stroke-width="1.5" opacity="0.35"/>
    <circle cx="400" cy="215" r="6" fill="COLOR" opacity="0.9"/>
    <circle cx="480" cy="215" r="14" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.8"/>
    <circle cx="320" cy="215" r="14" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.8"/>
    <circle cx="400" cy="135" r="14" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.8"/>
    <circle cx="400" cy="295" r="14" fill="none" stroke="COLOR" stroke-width="2.5" opacity="0.8"/>
    <circle cx="457" cy="158" r="10" fill="none" stroke="COLOR" stroke-width="2" opacity="0.6"/>
    <circle cx="343" cy="272" r="10" fill="none" stroke="COLOR" stroke-width="2" opacity="0.6"/>
  `,
};

function buildSVG(theme, title, category) {
  const { bg1, bg2, accent, icon } = theme;
  const iconSvg = (ICONS[icon] || ICONS.apple).replaceAll('COLOR', accent);

  // Shorten title for display
  const displayTitle = title.length > 28 ? title.slice(0, 26) + '…' : title;
  const displayCategory = category.toUpperCase();

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${bg2};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${accent};stop-opacity:0" />
      <stop offset="50%" style="stop-color:${accent};stop-opacity:0.08" />
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#bg)"/>
  <rect width="800" height="500" fill="url(#shimmer)"/>

  <!-- Subtle grid -->
  <g opacity="0.04" stroke="${accent}" stroke-width="0.5">
    <line x1="0" y1="100" x2="800" y2="100"/>
    <line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="300" x2="800" y2="300"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="160" y1="0" x2="160" y2="500"/>
    <line x1="320" y1="0" x2="320" y2="500"/>
    <line x1="480" y1="0" x2="480" y2="500"/>
    <line x1="640" y1="0" x2="640" y2="500"/>
  </g>

  <!-- Glow circle behind icon -->
  <circle cx="400" cy="220" r="160" fill="${accent}" opacity="0.04"/>
  <circle cx="400" cy="220" r="100" fill="${accent}" opacity="0.04"/>

  <!-- Product icon -->
  <g filter="url(#glow)" transform="translate(0, 5)">
    ${iconSvg}
  </g>

  <!-- Bottom bar -->
  <rect x="0" y="440" width="800" height="60" fill="${bg1}" opacity="0.85"/>
  <line x1="0" y1="440" x2="800" y2="440" stroke="${accent}" stroke-width="0.5" opacity="0.4"/>

  <!-- Category label -->
  <text x="36" y="462" font-family="SF Pro Display, -apple-system, Helvetica Neue, sans-serif"
        font-size="10" font-weight="600" letter-spacing="3" fill="${accent}" opacity="0.9">${displayCategory}</text>

  <!-- Title -->
  <text x="36" y="483" font-family="SF Pro Display, -apple-system, Helvetica Neue, sans-serif"
        font-size="15" font-weight="500" fill="white" opacity="0.92">${displayTitle}</text>

  <!-- Accent dot -->
  <circle cx="772" cy="468" r="4" fill="${accent}" opacity="0.7"/>
</svg>`;
}

// Article → image mapping
const ARTICLES = [
  // iPhone
  { file: 'a7cd7e91.jpg', title: 'iPhone 17 Pro', category: 'iPhone' },
  { file: '57868154.jpg', title: 'iPhone 17 Pro Max', category: 'iPhone' },
  { file: '9eaa2064.jpg', title: 'iPhone 17 標準モデル', category: 'iPhone' },
  { file: '4642f38f.jpg', title: 'iPhone 17e', category: 'iPhone' },
  { file: 'b3f67fa2.jpg', title: 'iPhone 16 Pro', category: 'iPhone' },
  { file: 'd895a428.jpg', title: 'iPhone 16 Plus', category: 'iPhone' },
  // Mac
  { file: 'c813bf7c.jpg', title: 'MacBook Pro M5', category: 'Mac' },
  { file: '493a6046.jpg', title: 'MacBook Pro 16" M5 Max', category: 'Mac' },
  { file: 'd6f96f35.jpg', title: 'MacBook Air M4', category: 'Mac' },
  { file: '9eb6493f.jpg', title: 'M5 MacBook Air', category: 'Mac' },
  { file: '41baa706.jpg', title: 'MacBook Neo', category: 'Mac' },
  { file: '1a1e1a51.jpg', title: 'Mac mini M4 Pro', category: 'Mac' },
  { file: 'da26bc04.jpg', title: 'Mac mini M5 Pro', category: 'Mac' },
  { file: '516f7093.jpg', title: 'Mac Studio M4 Ultra', category: 'Mac' },
  { file: '524e307a.jpg', title: 'Mac Studio M5 Ultra', category: 'Mac' },
  // iPad
  { file: 'f2c2b175.jpg', title: 'iPad Air M4', category: 'iPad' },
  { file: '83e89969.jpg', title: 'iPad Air M5', category: 'iPad' },
  { file: '8be92a61.jpg', title: 'iPad Pro 13インチ OLED', category: 'iPad' },
  { file: '05a6c8d5.jpg', title: 'iPad Pro M5', category: 'iPad' },
  { file: '87f8bbab.jpg', title: 'iPad mini 第7世代', category: 'iPad' },
  // Audio
  { file: '0ab90506.jpg', title: 'AirPods Pro 3', category: 'Audio' },
  { file: 'eccd717f.jpg', title: 'AirPods Pro 3 完全レビュー', category: 'Audio' },
  { file: '2994702f.jpg', title: 'AirPods Max チタニウム', category: 'Audio' },
  // Wearables
  { file: '1bceeeae.jpg', title: 'Apple Watch Series 10', category: 'Wearables' },
  { file: '4f82868c.jpg', title: 'Apple Watch Ultra 3', category: 'Wearables' },
  { file: 'bfa4ffdd.jpg', title: 'AirTag 完全ガイド', category: 'Wearables' },
  // Software / Services
  { file: 'a3680f51.jpg', title: 'iOS 19', category: 'Software' },
  { file: '39d3de06.jpg', title: 'iOS 19 完全ガイド', category: 'Software' },
  { file: 'f2b14bc1.jpg', title: 'macOS Sequoia プロ活用', category: 'Software' },
  { file: 'c190acb6.jpg', title: 'macOS Sequoia 完全ガイド', category: 'Software' },
  { file: 'd26acea7.jpg', title: 'Apple Intelligence', category: 'Software' },
  { file: '8fabb996.jpg', title: 'HomePod mini セットアップ', category: 'Software' },
  { file: '8a774e4a.jpg', title: 'Apple TV 4K', category: 'Software' },
  // History
  { file: '01cd878b.jpg', title: 'Apple 50年の歴史', category: 'History' },
  { file: '7f5f6cf8.jpg', title: 'Apple 50年史', category: 'History' },
  // Security
  { file: '22de7440.jpg', title: 'Appleセキュリティ完全ガイド', category: 'Security' },
  { file: 'd395c8f5.jpg', title: 'Appleプライバシー戦略', category: 'Security' },
  // Spatial
  { file: '671567b0.jpg', title: 'Apple Vision Pro', category: 'Spatial' },
  { file: 'e7a3d064.jpg', title: 'Vision Pro 完全レビュー', category: 'Spatial' },
  // Ecosystem
  { file: '13a46e06.jpg', title: 'Appleエコシステムの価値', category: 'Ecosystem' },
  { file: 'c671b9c0.jpg', title: 'Appleエコシステム完全ガイド', category: 'Ecosystem' },
];

// Homepage feature images (different filenames)
const HOMEPAGE_IMAGES = [
  { file: 'mwqLtfoHvDwk.jpg', title: 'M5 MacBook Air', category: 'Mac' },
  { file: 'DfMi0pbXqqGF.jpg', title: 'iPhone 17 Pro', category: 'iPhone' },
  { file: '6BzbPQAE4lCW.jpg', title: 'Apple Intelligence', category: 'Software' },
  { file: 'Bo7BV2xApq7V.jpg', title: 'iPad Pro M5', category: 'iPad' },
  { file: 'CFkSueBqlWJp.jpg', title: 'Apple Watch Ultra 3', category: 'Wearables' },
  { file: 'Cy7NJcxIYCxc.jpg', title: 'AirPods Pro 3', category: 'Audio' },
  { file: '0MzY9mPnH5Jf.jpg', title: 'Apple Vision Pro', category: 'Spatial' },
  { file: '1H6jeDAqUO4S.jpg', title: 'Appleエコシステム', category: 'Ecosystem' },
  { file: '2TjY14wukmBr.jpg', title: 'Mac Studio M5', category: 'Mac' },
  { file: 'DAkrndqNhREz.jpg', title: 'Apple Security', category: 'Security' },
  { file: 'gSNm86lvh9DE.jpg', title: 'Apple History', category: 'History' },
  { file: 'JgkFy5R64E18.jpg', title: 'MacBook Pro M5', category: 'Mac' },
  { file: 'KI8LZxWp8G9n.jpg', title: 'iPhone 16 Pro', category: 'iPhone' },
  { file: 'L5lJt8qLF93n.jpg', title: 'iPad Air M5', category: 'iPad' },
  { file: 'LQr4zsUeOs7E.jpg', title: 'AirPods Max', category: 'Audio' },
  { file: 'OoengnWcJ17i.jpg', title: 'macOS Sequoia', category: 'Software' },
  { file: 'PK04D3WaeSNi.jpg', title: 'Apple Watch Series 10', category: 'Wearables' },
  { file: 't2ktF9SdVoHV.jpg', title: 'HomePod mini', category: 'Software' },
  { file: 'UgjkrdorFTbp.jpg', title: 'Mac mini M5', category: 'Mac' },
  { file: 'zx2qYV5F4Tpc.jpg', title: 'Apple TV 4K', category: 'Software' },
];

async function generateImage(file, title, category) {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES.Software;
  const svg = buildSVG(theme, title, category);
  const outputPath = join(PUBLIC_DIR, file);

  try {
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90, progressive: true })
      .toFile(outputPath);
    console.log(`✓ ${file} — ${title}`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

async function main() {
  console.log('Generating Apple-style product images...\n');

  const all = [...ARTICLES, ...HOMEPAGE_IMAGES];

  for (const { file, title, category } of all) {
    await generateImage(file, title, category);
  }

  console.log(`\nDone! Generated ${all.length} images.`);
}

main().catch(console.error);
