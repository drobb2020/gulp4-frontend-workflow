const { src, dest, watch, series, parallel } = require("gulp");

// CSS & SCSS requirements
// const sass = require("gulp-sass");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const combinemq = require("postcss-combine-media-query");
const cssnano = require("cssnano");

// JavaScript requirements
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

// Adding Node.js packages to your website
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

// Utilities
const del = require("del");
const imagemin = require("gulp-imagemin");
const replace = require("gulp-replace");
const browserSync = require("browser-sync").create();

// SCSS to CSS ***DEV***
function scssDevTask() {
  return src("app/scss/main.scss", { sourcemaps: true })
    .pipe(
      sass({
        includePaths: "node_modules/@fortawesome",
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("dist/css", { sourcemaps: "." }));
}

// SCSS to Minified CSS ***PROD***
function scssProdTask() {
  return src("app/scss/main.scss", { sourcemaps: true })
    .pipe(
      sass({
        includePaths: "node_modules/@fortawesome",
      })
    )
    .pipe(postcss([autoprefixer(), combinemq(), cssnano()]))
    .pipe(dest("dist/css", { sourcemaps: "." }));
}

// Combine all JavaScript files into one script
function concatJsTask() {
  return src("app/js/*.js").pipe(concat("scripts.js")).pipe(dest("app/js"));
}

// Add in any required node modules
function browserifyTask() {
  return browserify("app/js/scripts.js")
    .bundle()
    .pipe(source("scripts.js"))
    .pipe(buffer())
    .pipe(dest("app/js"));
}

// Write final scripts.js file to dest folder ***DEV***
function jsDevTask() {
  return src("app/js/scripts.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("dist/js", { sourcemaps: "." }));
}

// Write final scripts.js file to dest folder ***PROD***
function jsProdTask() {
  return src("app/js/scripts.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(uglify())
    .pipe(dest("dist/js", { sourcemaps: "." }));
}

// Clean up any unneeded files
function cleanTask() {
  return del(["app/js/scripts.js"]);
}

// Minify images for the website
function imageMinTask() {
  return src("img/*")
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ],
        { verbose: true }
      )
    )
    .pipe(dest("img"));
}

// Set a unique cache buster value to the css and js tags
function cacheBustTask() {
  let cbNumber = new Date().getTime();
  return src("index.html")
    .pipe(replace(/cb=\d+/g, "cb=" + cbNumber))
    .pipe(dest("."));
}

// Where to find the html files for the website Browser Service
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

// Reload the browser on changes to files (html, scss, or js)
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// Gulp Watch Task
function watchTask() {
  watch("index.html", browserSyncReload);
  watch(
    ["app/scss/**/*.scss", "app/js/**/*.js", "!app/js/scripts.js"],
    series(
      scssDevTask,
      concatJsTask,
      browserifyTask,
      jsDevTask,
      cleanTask,
      cacheBustTask,
      browserSyncReload
    )
  );
  watch('img/*', series(imageMinTask, browserSyncReload));
}

// Gulp default tasks, type gulp to run!
exports.default = series(
  scssDevTask,
  concatJsTask,
  browserifyTask,
  jsDevTask,
  cleanTask,
  imageMinTask,
  cacheBustTask,
  browserSyncServe,
  watchTask
);

// Production gulp tasks, type gulp prod to run!
exports.prod = series(
  scssProdTask,
  concatJsTask,
  browserifyTask,
  jsProdTask,
  cleanTask,
  imageMinTask,
  cacheBustTask
);
