const now = String(Date.now())

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./src/styles/tailwind.css')

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })

  eleventyConfig.addShortcode('version', function () {
    return now
  })

	eleventyConfig.setServerOptions({
		module: "@11ty/eleventy-server-browsersync",
		port: 8080,
		open: false,
		notify: false,
		ui: false,
		ghostMode: false,
	});

  return {
    htmlTemplateEngine: "njk",
    dir: {
        input: "src",
        output: "_site",
        includes: "includes",
        layouts: "layouts",
        data: "data"
    },
  };
}
