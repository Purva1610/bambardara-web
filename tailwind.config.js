module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'forest-green': '#0B5D3A',
        'luxury-gold': '#D4AF37',
        'dark-charcoal': '#333333',
        'ivory-white': '#F8F4E9',
        'natural-brown': '#8B4513',
        'light-charcoal': '#666666',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
