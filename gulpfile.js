var gulp = require('gulp'),
    concat = require('gulp-continuous-concat'),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    del = require('del'),
    sass = require('gulp-sass');

    indexHtmlComponents = [
      './index/before.html',
      './index/view.html',
      './index/after.html'
    ],

    cssDestination = "./",

    appJsComponents = [
      "./app/app.js",
      "./app/**/*.js"
    ],

    defaultTasks = [
      'clean',
      'compile-scss',
      'compile-js',
      'compile-index.html',
      'run',
      'sass:watch'
    ],

    cleanupFiles = [
      'index.html',
      'index.css',
      'index.js',
    ],

    compile = function(components, file, dir){
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

gulp.task('compile-scss', function () {
  return gulp.src('./style/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(cssDestination));
});

gulp.task('compile-js', function () {
  return compile(appJsComponents, 'index.js', './');
});


gulp.task('compile-index.html', function () {
  return compile(indexHtmlComponents, 'index.html', './');
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['compile-scss']);
});

gulp.task('default', defaultTasks);
