const Image = require("@11ty/eleventy-img")
const htmlmin = require('html-minifier')
const now = String(Date.now())

async function imageShortcode(src, alt, sizes = "100vw") {
  let metadata = await Image(`${src}`, {
    widths: [600, 1000, 1600],
    formats: ["avif", "jpeg"],
    urlPath: "/img/",
    outputDir: "./_site/img/"
  });
  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)

  eleventyConfig.addPassthroughCopy("favicon.png")
  eleventyConfig.addPassthroughCopy("src/images")
  eleventyConfig.addPassthroughCopy({"global.out.css": "global.css",});
  
  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/alpine.js': './js/alpine.js',
  })

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified
    }

    return content
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