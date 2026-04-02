import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0b0c',
        muted: '#6e6e73'
      }
    }
  },
  plugins: []
};

export default config;
