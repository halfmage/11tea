const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ["./src/**/*.{html,md,njk,ejs,pug}"],
  },
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#000'
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif']
      }
    }
  },
  variants: {},
  plugins: [],
}