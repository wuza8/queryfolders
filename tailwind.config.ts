import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/TitleBar.vue',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
    },
    colors: {
      tcolor: 'var(--color-tcolor)',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      third: 'var(--color-third)',
      fourth: 'var(--color-fourth)',
      danger: '#cc0000',
      accent: 'var(--color-accent)',
    },
    extend: {}
  },
  plugins: [],
}

export default config