module.exports = {
  purge: {
    content: ["dist/**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {},
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
