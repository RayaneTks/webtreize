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
        navy: 'var(--color-navy)',
        orange: {
          DEFAULT: 'var(--color-orange)',
          hover: 'var(--color-orange-hover)',
        },
        neutral: {
          bg: 'var(--color-neutral-bg)',
          text: 'var(--color-neutral-text)',
        },
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'grid-drift': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '80px 80px' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.15' },
        },
        'ping-slow': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'bar-grow': {
          '0%': { transform: 'scaleY(0.1)', opacity: '0.5' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
          '100%': { transform: 'scaleY(0.1)', opacity: '0.5' },
        },
        'line-fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'grid-drift': 'grid-drift 10s linear infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bar-grow': 'bar-grow 2s ease-in-out infinite',
        'line-fade-in': 'line-fade-in 0.3s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
