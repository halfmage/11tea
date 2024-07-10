const colors = require('tailwindcss/colors')

module.exports = {
  content: ['_site/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: colors.lime,
      },
      fontFamily: {
        'primary': ['Inter, system-ui, sans-serif'],
      }
    },
  },
  plugins: [],
}