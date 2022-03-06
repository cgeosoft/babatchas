var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var static = require('metalsmith-static');
var sass = require('metalsmith-sass');
var moveUp = require('metalsmith-move-up')
var discoverPartials = require('metalsmith-discover-partials')
var buildinfo = require("metalsmith-build-info");
var registerHelpers = require("metalsmith-register-helpers");
var data = require('metalsmith-data');
var paths = require('metalsmith-paths');
var debug = require('metalsmith-debug');
var env = require('metalsmith-env');

const metalsmith = new Metalsmith(__dirname)
  .use(debug())
  .source("./src")
  .destination('./dist')
  .ignore(["layouts", "static"])
  .clean(true)
  .use(env())
  .use(moveUp('pages/**/*.md'))
  .use(static([{
    src: "src/static",
    dest: "."
  }]))
  .use(sass({
    outputDir: 'css/'
  }))
  .use(collections({
    articles: {
      pattern: 'posts/**/*.md',
      refer: false,
      sortBy: 'date',
      reverse: true,
    }
  }))
  .use(buildinfo())
  .use(paths({
    property: 'paths',
  }))
  .use((files, metalsmith, done) => {
    setImmediate(done);
    Object.keys(files).forEach((file) => {
      metalsmith.metadata().path = files[file].paths
    })
  })
  .use(data({
    globals: "./globals.yml"
  }))
  .use(markdown())
  // .use(permalinks({
  //   relative: false
  // }))
  .use(discoverPartials({
    directory: './src/partials',
    pattern: /\.hbs$/
  }))
  .use(registerHelpers({
    directory: './src/helpers',
  }))
  .use(layouts({
    default: "home.hbs",
    pattern: "**/*.html",
    directory: "./src/layouts"
  }))
  .use(debug())
  .build((err, files) => {
    if (err) throw err;
  });
