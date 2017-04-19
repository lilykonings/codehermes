var gulp = require('gulp');

var cache           = require('gulp-cache');
var clean           = require('gulp-clean');
var concat          = require('gulp-concat');
var imagemin        = require('gulp-imagemin');
var jshint          = require('gulp-jshint');
var minifycss       = require('gulp-minify-css');
var plumber         = require('gulp-plumber');
var rename          = require('gulp-rename');
var sass            = require('gulp-sass');
var stylish         = require('jshint-stylish');
var uglify          = require('gulp-uglify');
var declare         = require('gulp-declare');
var shell           = require('gulp-shell');

gulp.task('style', function(){
  return gulp.src('_scss/*.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('script-lib', function(){
  return gulp.src('_js/lib/*.js')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('lib.js'))
    .pipe(rename('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('script-custom', function(){
  return gulp.src('_js/custom/*.js')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('script', ['script-lib', 'script-custom'], function(){});

gulp.task('watch', function(){
  gulp.watch('_scss/**/*.scss', ['style']);
  gulp.watch('_js/**/*.js', ['script']);
});

gulp.task('default', ['style', 'script', 'watch'], function(){
  console.log('waiting...');
});
