var gulp = require('gulp'),
    concat = require('gulp-continuous-concat'),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    del = require('del'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade')

    cssSource     = './app/index.scss',
    jsSource      = [ "./app/app.js", "./app/**/*.js"],
    templatesSournce = [],

    cssDestination = "./serve/css",
    jsDestination = "./serve/js/app.js",
    indexDestination = "./serve/index.html",
    templatesDestination = "./serve/templates/",

    appJsComponents = [
      "./app/app.js",
      "./app/**/*.js"
    ],

    compile = function(components, file, dir){
      return gulp.src(components)
          .pipe(watch(components))
          .pipe(concat(file))
          .pipe(gulp.dest(dir));
    };

gulp.task('clean', function () {
  del([
    cssDestination,
    jsDestination,
    indexDestination,
    templatesDestination +"**/*.html"
  ]);
});

gulp.task('run', shell.task([
  'node runner.js'
]));

gulp.task('compile-scss', function () {
  return gulp.src(cssSource)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(cssDestination));
});

gulp.task('compile-js', function () {
  return compile(jsSource, jsDestination, './');
});

gulp.task('compile-jade', function() {
  return gulp.src('app/**/*.jade')
      .pipe(jade()) // pip to jade plugin
      .pipe(gulp.dest(templatesDestination)); // tell gulp our output folder
});

gulp.task('compile-index.html', function () {
  return compile([
    './index/before.html',
    './index/view.html',
    './index/after.html'
  ], indexDestination, './');
});

gulp.task('sass:watch', function () {
  return gulp.watch('./app/**/*.scss', ['compile-scss']);
});

gulp.task('compile', [
  'compile-scss',
  'compile-js',
  'compile-jade',
  'compile-index.html',
]);

gulp.task('default', [
  'clean',
  'compile',
  'sass:watch'
  //'run',
]);
