/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#06080D',
        obsidian: '#0B0E16',
        surface: '#111520',
        surface2: '#181D2E',
        surface3: '#1F2538',
        crimson: '#C0392B',
        crimson2: '#E74C3C',
        gold: '#C9A84C',
        gold2: '#E8C46A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
