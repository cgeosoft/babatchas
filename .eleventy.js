const pug = require("pug");
const yaml = require("js-yaml");
const { EleventyI18nPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("pug", pug);
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addWatchTarget("./src/scss/");
  eleventyConfig.addPassthroughCopy({ "./src/static": "./" });
  eleventyConfig.setServerPassthroughCopyBehavior("copy");
  eleventyConfig.addGlobalData("env", process.env.NODE_ENV);
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    // any valid BCP 47-compatible language tag is supported
    defaultLanguage: "en", // Required, this site uses "en"
  });

  return {
    html: true,
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
  };
};

