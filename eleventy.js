module.exports = function(eleventyConfig) {
  // Copy CSS files to output with caching
  eleventyConfig.addPassthroughCopy({"src/styles.css": "styles.css"});
  
  // Create blog posts collection with performance optimization
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("blog/**/*.md")
      .sort((a, b) => b.date - a.date); // More efficient than reverse()
  });
  
  // Add optimized date filter
  eleventyConfig.addFilter("dateDisplay", function(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric"
    });
  });
  
  // Improved excerpt filter with word limit
  eleventyConfig.addFilter("excerpt", function(content, limit = 150) {
    if (!content) return '';
    const excerpt = content.split("<!--more-->")[0];
    const words = excerpt.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return excerpt;
  });

  // Add word count filter for performance metrics
  eleventyConfig.addFilter("wordCount", function(content) {
    return content ? content.split(' ').length : 0;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
