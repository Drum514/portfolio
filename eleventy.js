module.exports = function(eleventyConfig) {
  // Copy CSS files and images to output
  eleventyConfig.addPassthroughCopy({"src/styles.css": "styles.css"});
  eleventyConfig.addPassthroughCopy({"src/*.jpg": "."});
  eleventyConfig.addPassthroughCopy({"src/*.png": "."});
  
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

