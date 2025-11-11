module.exports = {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: '#6b0f1a',
        purpledeep: '#5b2a86',
        litblue: '#2f6fbf'
      },
      backgroundImage: {
        'parallax-grid': "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
      }
    }
  },
  plugins: [],
}
