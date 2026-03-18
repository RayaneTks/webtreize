import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001F3F',
        orange: {
          DEFAULT: '#D9480F',
          hover: '#B83E0D',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          dark: '#e8e0d4',
        },
        ink: '#0a0a0a',
        neutral: {
          bg: '#f5f0e8',
          text: '#4a4a4a',
        },
      },
      boxShadow: {
        'brutal': '6px 6px 0 #001F3F',
        'brutal-sm': '4px 4px 0 #001F3F',
        'brutal-lg': '8px 8px 0 #001F3F',
        'brutal-orange': '6px 6px 0 #D9480F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'line-fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'line-fade-in': 'line-fade-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
