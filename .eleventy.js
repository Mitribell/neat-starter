const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Add a custom filter to format quotes
  const options = {
    html: true, // дозволяє HTML у Markdown
    breaks: true, // переносить рядки як <br>
    linkify: true, // перетворює URL у посилання
    typographer: true, // ← Увімкнено "розумні лапки", тире тощо
    quotes: "«»“”", // ← перші дві — основні лапки, другі — fallback
  };

  const md = markdownIt(options);
  md.core.ruler.after("inline", "unwrap-image-paragraph", function (state) {
    const tokens = state.tokens;

    for (let i = 0; i < tokens.length - 2; i++) {
      const isImageParagraph =
        tokens[i].type === "paragraph_open" &&
        tokens[i + 1].type === "inline" &&
        tokens[i + 1].children &&
        tokens[i + 1].children.length === 1 &&
        tokens[i + 1].children[0].type === "image" &&
        tokens[i + 2].type === "paragraph_close";

      if (isImageParagraph) {
        const imgToken = tokens[i + 1].children[0];
        const src = imgToken.attrs.find((attr) => attr[0] === "src")[1];
        const alt = imgToken.content;
        const titleAttr = imgToken.attrs.find((attr) => attr[0] === "title");
        const caption = titleAttr
          ? `<figcaption>${titleAttr[1]}</figcaption>`
          : "";

        const figureHtml = `
<figure>
  <img src="${src}" alt="${alt}">
  ${caption}
</figure>`.trim();

        // Заміна трьох токенів одним
        const htmlToken = new state.Token("html_block", "", 0);
        htmlToken.content = figureHtml;

        tokens.splice(i, 3, htmlToken);
      }
    }
  });
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByTag("post").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("code", function (collection) {
    return collection.getFilteredByTag("code").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("work", function (collection) {
    return collection.getFilteredByTag("work").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("experiment", function (collection) {
    return collection
      .getFilteredByTag("experiment")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(
      (tag) =>
        ["all", "posts", "post", "work", "experiment", "code"].indexOf(tag) ===
        -1
    );
  });
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // Output formats for each image.
    formats: ["avif", "webp", "auto"],

    // widths: ["auto"],

    failOnError: false,
    htmlOptions: {
      imgAttributes: {
        // e.g. <img loading decoding> assigned on the HTML tag will override these values.
        loading: "lazy",
        decoding: "async",
      },
    },

    sharpOptions: {
      animated: true,
    },
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Copy p5 Folder to route of /_site
  eleventyConfig.addPassthroughCopy("./src/static/p5");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });
  eleventyConfig.setLibrary("md", md);
  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
