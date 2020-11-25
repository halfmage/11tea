const htmlmin = require("html-minifier");
const Image = require("@11ty/eleventy-img");
const sharp = require("sharp");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./_tmp/style.css");
  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
  });
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async (src, alt, className) => {
      if (!alt) {
        throw new Error(`Missing \`alt\` on Image from: ${src}`);
      }

      let stats = await Image(src, {
        widths: [25, 320, 640, 960, 1200, 1800, 2400],
        formats: ["jpeg", "webp"],
        urlPath: "/images/",
        outputDir: "./dist/images/",
      });

      let lowestSrc = stats["jpeg"][0];

      const placeholder = await sharp(lowestSrc.outputPath)
        .resize({ fit: sharp.fit.inside })
        .blur()
        .toBuffer();

      const base64Placeholder = `data:image/png;base64,${placeholder.toString(
        "base64"
      )}`;

      const srcset = Object.keys(stats).reduce(
        (acc, format) => ({
          ...acc,
          [format]: stats[format].reduce(
            (_acc, curr) => `${_acc} ${curr.srcset} ,`,
            ""
          ),
        }),
        {}
      );

      const source = `<source type="image/webp" data-srcset="${srcset["webp"]}" >`;

      const img = `<img
      class="lazy ${className}"
      alt="${alt}"
      src="${base64Placeholder}"
      data-src="${lowestSrc.url}"
      data-sizes='(min-width: 1024px) 1024px, 100vw'
      data-srcset="${srcset["jpeg"]}"
      width="${lowestSrc.width}"
      height="${lowestSrc.height}">`;

      return `<div class="image-wrapper"><picture> ${source} ${img} </picture></div>`;
    }
  );

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "layouts",
      includes: "includes",
      data: "data",
    },
    passthroughFileCopy: true,
    templateFormats: ["html", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
