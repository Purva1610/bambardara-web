/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#12271d',
        'forest-2': '#1c3a2a',
        gold: '#b8933f',
        'gold-light': '#d8b76a',
        cream: '#f6f2e8',
        paper: '#fffdf8',
        ink: '#20281f',
        muted: '#6b6f63',
        line: '#e4ddc9',
        good: '#3f7d52',
        warn: '#b8752f',
        wait: '#8a8570'
      },
      fontFamily: {
        serif: ['Georgia', 'Iowan Old Style', 'serif'],
        sans: ['Helvetica Neue', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
}
