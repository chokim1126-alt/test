import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Noto Serif KR', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        cream: '#e8d5b0',
        gold: '#c9a84c',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 50%, 90%': { transform: 'translateX(-10px)' },
          '30%, 70%': { transform: 'translateX(10px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        shake: 'shake 0.6s ease-in-out',
        fadeIn: 'fadeIn 0.6s ease-in-out',
        blink: 'blink 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
