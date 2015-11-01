var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('js', function () {
  gulp.src('src/**/*.js')
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Failed to build JS'
    })
  }))
  .pipe(concat('jquery.stockquotes.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('js:min', function () {
  gulp.src('src/**/*.js')
  .pipe(concat('jquery.stockquotes.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/'));
});

gulp.task('less', function () {
  gulp.src('src/stockquotes.less')
  .pipe(plumber({
    errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Failed to build LESS'
    })
  }))
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(rename('jquery.stockquotes.css'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('less:min', function () {
  gulp.src('src/stockquotes.less')
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(minifyCss())
  .pipe(rename('jquery.stockquotes.min.css'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('jshint', function () {
  gulp.src('src/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function () {
  gulp.src('src/**/*.js')
  .pipe(jscs());
});

gulp.task('build', ['js', 'js:min', 'less', 'less:min']);
gulp.task('test', ['jshint', 'jscs']);
gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.less', ['less']);
});
gulp.task('default', ['watch']);
