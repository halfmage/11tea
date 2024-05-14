const Image = require("@11ty/eleventy-img")
const now = String(Date.now())

async function imageShortcode(src, alt, pictureClass, imgClass) {
  if(alt === undefined) {
      throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
      widths: [300, 600, 1200, 2400],
      formats: ["webp", "png"],
      outputDir: "./_site/img/",
  });

  let lowsrc = metadata.png[0];
  let highsrc = metadata.png[metadata.png.length - 1];

  return `<picture class="${pictureClass}">
      ${Object.values(metadata).map(imageFormat => {
      return ` <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}">`;
      }).join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        class="inline-block ${imgClass}"
        loading="lazy"
        decoding="async">
      </picture>`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./src/styles/tailwind.css')

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  })

  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/fonts')

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)

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
        data: "data"
    },
  };
}
