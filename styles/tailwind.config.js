const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['_site/**/*.html'],
    options: {
      safelist: [],
    },
  },
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      gray: colors.warmGray,
      primary: colors.lime,
    },
    fontFamily: {
      'sans': ['Inter', 'sans-serif']
    }
  },
  variants: {},
  plugins: [],
}