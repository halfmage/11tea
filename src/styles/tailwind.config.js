const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["dist/**/*.html"],
  },
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        primary: colors.lime,
      },
    },
  },
  variants: {},
};
