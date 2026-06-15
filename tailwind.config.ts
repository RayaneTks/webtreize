import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#faf9f7',
        surface: {
          DEFAULT: '#ffffff',
          raised: '#f5f4f1',
          muted: '#eeede9',
        },
        ink: '#0c1220',
        muted: '#4a5568',
        subtle: '#7a8494',
        line: 'rgba(12, 18, 32, 0.08)',
        'line-strong': 'rgba(12, 18, 32, 0.14)',
        accent: {
          DEFAULT: '#D9480F',
          hover: '#c43f0d',
          soft: 'rgba(217, 72, 15, 0.1)',
        },
        navy: '#001F3F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,31,63,0.04), 0 16px 48px -20px rgba(0,31,63,0.1)',
        panel:
          '0 0 0 1px rgba(0,31,63,0.06), 0 24px 56px -28px rgba(0,31,63,0.12)',
        lift: '0 20px 40px -24px rgba(0,31,63,0.15)',
      },
      backgroundImage: {
        'hero-light':
          'radial-gradient(ellipse 70% 55% at 85% 15%, rgba(217,72,15,0.07), transparent 50%), radial-gradient(ellipse 50% 45% at 5% 90%, rgba(0,31,63,0.05), transparent 45%)',
        'mesh-navy':
          'radial-gradient(ellipse 60% 50% at 0% 100%, rgba(217,72,15,0.12), transparent 50%), radial-gradient(ellipse 40% 40% at 100% 0%, rgba(255,255,255,0.06), transparent 45%)',
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) both',
        'rule-grow': 'rule-grow 1s cubic-bezier(0.23, 1, 0.32, 1) both',
        'bar-fill': 'bar-fill 1.4s cubic-bezier(0.23, 1, 0.32, 1) both',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'rule-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'bar-fill': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      maxWidth: {
        site: '1400px',
      },
    },
  },
  plugins: [],
};

export default config;
