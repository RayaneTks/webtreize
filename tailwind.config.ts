import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A1A3F',
        accent: '#00C2FF',
        cta: '#FF5722',
        textPrimary: '#FFFFFF',
        textSecondary: '#F0F2F5',
      },
      boxShadow: {
        'neon-accent': '0 0 20px rgba(0, 194, 255, 0.55)',
        'cta-glow': '0 0 25px rgba(255, 87, 34, 0.6)',
      },
      borderRadius: {
        glass: '24px',
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
