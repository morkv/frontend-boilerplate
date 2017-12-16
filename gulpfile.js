/* eslint-disable */

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const pixrem = require('pixrem');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const handlebars = require('gulp-compile-handlebars');
const path = require('path');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const svgo = require('gulp-svgo');
const copy = require('gulp-copy');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');
const webpack = require('webpack');

const buildpath = {
  main: 'public/',
  js: 'public/js/',
  css: 'public/css/',
  images: 'public/',
  favicon: 'public/',
  icons: 'public/',
  fonts: 'public/'
};

const stylesheets = ['source/assets/sass/style.scss', 'source/assets/sass/documentation.scss'];

gulp.task('copy', ['copy:favicon', 'copy:images', 'copy:robots', 'copy:fonts', 'copy:icons']);

gulp.task('copy:robots', function (cb) {
  return gulp.src(['source/assets/robots.txt'])
    .pipe(copy(buildpath.main, {prefix: 2}));
});

gulp.task('copy:favicon', function (cb) {
  return gulp.src(['source/assets/favicon/**/*'])
    .pipe(copy(buildpath.favicon, {prefix: 2}));
});

gulp.task('copy:images', function (cb) {
  return gulp.src(['source/assets/images/**/*'])
    .pipe(copy(buildpath.images, {prefix: 2}));
});

gulp.task('copy:fonts', function (cb) {
  return gulp.src(['source/assets/fonts/**/*'])
    .pipe(copy(buildpath.fonts, {prefix: 2}));
});

gulp.task('copy:icons', function (cb) {
  return gulp.src(['source/assets/icons/**/*'])
    .pipe(copy(buildpath.icons, {prefix: 2}));
});


gulp.task('webpack', function () {
  return webpack(require('./webpack.config.dev.js'), function (err, stats) {
    if (err) {
      console.error("webpack", err)
    }
    console.log("[webpack]", stats.toString({
      colors: true
    }));
    browserSync.reload();
  });
});

gulp.task('webpack:prod', function (cb) {
  return webpack(require('./webpack.config.prod.js'), function (err, stats) {
    if (err) {
      console.error("[webpack]", err)
    }
    console.log("[webpack]", stats.toString({
      colors: true
    }));
  });
});

gulp.task('postcss:dev', function() {
  var processors = [
      pixrem(),
      autoprefixer({
          browsers: ['> 0%']
      })
  ];

  return gulp.src(stylesheets)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss(processors))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(buildpath.css))
      .pipe(browserSync.stream({
          match: "**/*.css"
      }));
});

gulp.task('postcss:prod', function() {
    var processors = [
        pixrem(),
        autoprefixer({
            browsers: ['> 0%']
        }),
        cssnano({
            safe: true,
        })
    ];

    return gulp.src(stylesheets)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildpath.css))
});


gulp.task('svgo', function () {
  return gulp.src('source/assets/icons/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('source/assets/icons'));
});

gulp.task('svgstore', ['svgo'], function () {
  return gulp
    .src('source/assets/icons/*.svg')
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(buildpath.images));
});


gulp.task('watch', function () {
  gulp.watch(['source/**/*.html', 'source/partials/**/*.html'], ['handlebars']);
  gulp.watch(['source/assets/sass/**/*.scss'], ['postcss:dev']);
  gulp.watch(['source/assets/js/**/*.js'], ['webpack']);
  gulp.watch(['source/assets/icons/*.svg'], ['svgstore']);
  gulp.watch(['source/assets/images/**/*'], ['copy:images']);
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});




gulp.task('handlebars', function () {
  var options = {
    batch: ['source/partials']
  };

  return gulp.src(['source/*.html'])
      .pipe(handlebars({}, options))
      .pipe(gulp.dest('public'))
      .pipe(browserSync.stream());
});


gulp.task('w3cjs', function () {
  var w3cjs = require('gulp-w3cjs');
  return gulp.src(buildpath.main + '**/*.html')
    .pipe(w3cjs())
    .pipe(w3cjs.reporter());
});

gulp.task('a11y', function () {
  var access = require('gulp-accessibility');
  return gulp.src(buildpath.main + '**/*.html')
    .pipe(access({
      force: true
    }))
    .on('error', console.log);
});

gulp.task('critical', function (cb) {
  var critical = require('critical');
  var files = [
    ['index.html', 'index.html']
  ];

  files.forEach(function (filePair) {
    critical.generate({
      inline: true,
      base: buildpath.main,
      src: filePair[0],
      dest: filePair[1],
      minify: true,
      width: 1440,
      height: 700
    });
  });
});

gulp.task('clean', function () {
  return gulp.src('public/', {force: true})
      .pipe(clean());
});



// TASKS

gulp.task('default', (cb) => {
  gulpSequence('clean', ['copy', 'handlebars', 'svgstore', 'webpack', 'postcss:dev'], 'browserSync', 'watch', cb);
});
gulp.task('build', (cb) => {
  gulpSequence('clean', ['copy', 'handlebars', 'svgstore', 'webpack:prod', 'postcss:prod'], cb);
});
gulp.task('test', ['w3cjs', 'a11y']);