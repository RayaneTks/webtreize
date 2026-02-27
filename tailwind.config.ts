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
        void: '#0d1525',
        'void-depth': '#152238',
        'void-light': '#1a2842',
        neon: '#00C2FF',
        action: '#FF5722',
        snap: '#FFFC00',
      },
      fontSize: {
        'hero': ['clamp(1.875rem, 5.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mesh': 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(10, 26, 63, 0.5), transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(10, 26, 63, 0.3), transparent 50%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 194, 255, 0.15), 0 0 40px rgba(0, 194, 255, 0.08)',
        'action': '0 0 24px rgba(255, 87, 34, 0.35)',
        'action-pulse': '0 0 32px rgba(255, 87, 34, 0.5)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
