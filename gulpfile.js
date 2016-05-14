var gulp = require('gulp'),
    concat = require('gulp-continuous-concat'),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    del = require('del'),

    homeCssComponents = [
      './style/loader.css',
      './style/properties.css'
    ],

    indexHtmlComponents = [
      './index/before.html',
      './index/loader.html',
      './index/after.html'
    ],

    appHtmlComponents = [
      "./app/search/*.html",
      "./app/**/*.html"
    ],

    appCSSComponents = [
      "./app/**/*.css"
    ],

    appJsComponents = [
      "./app/init.js",
      "./app/**/*.js"
    ],

    defaultTasks = [
      'clean',
      'assemble-css',
      'assemble-html',
      'assemble-app-css',
      'assemble-app-html',
      'assemble-app-js',
      'run'
    ],

    cleanupFiles = [
      'index.html',
      'home.css',
      'app.js',
      'app.html',
      'app.css',
    ],

    assemble = function(components, file, dir){
      return gulp.src(components)
          .pipe(watch(components))
          .pipe(concat(file))
          .pipe(gulp.dest(dir));
    };

gulp.task('clean', function () {
  del(cleanupFiles);
});

gulp.task('run', shell.task([
  'node runner.js'
]));

gulp.task('assemble-app-css', function () {
  return assemble(appCSSComponents, 'app.css', './');
});

gulp.task('assemble-app-html', function () {
  return assemble(appHtmlComponents, 'app.html', './');
});

gulp.task('assemble-css', function () {
  return assemble(homeCssComponents, 'home.css', './');
});

gulp.task('assemble-html', function () {
  return assemble(indexHtmlComponents, 'index.html', './');
});

gulp.task('assemble-app-js', function () {
  return assemble(appJsComponents, 'app.js', './');
});

gulp.task('default', defaultTasks);