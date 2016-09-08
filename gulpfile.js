'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

// Paths.
var srcPath = './src/';
var destPath = './dist/';
var modulesPath = './node_modules/';

// Move HTML files.
gulp.task('html', function() {
  gulp.src(srcPath + '*.html')
      .pipe(gulp.dest(destPath));
});

// Move JavaScript files.
gulp.task('javascript', function() {
  gulp.src(srcPath + 'js/**/*.js')
    .pipe(gulp.dest(destPath + 'js/'));
});

// Compile SASS and move CSS.
gulp.task('scss', function() {
  gulp.src(srcPath + 'css/**/*.scss')
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(destPath + 'css/'));
});

// Move Materialize framework.
gulp.task('materialize', function() {
  gulp.src(modulesPath + 'materialize-css/dist/**/*')
    .pipe(gulp.dest(destPath + 'frameworks/materialize-css/'));
});

// Move jquery.
gulp.task('jquery', function() {
  gulp.src(modulesPath + 'jquery/dist/jquery.js')
    .pipe(gulp.dest(destPath + 'frameworks/jquery/'));
});

// Watch Task.
gulp.task("watch", function() {
  gulp.watch(srcPath + "js/**/*.js", ["javascript"]); // JavaScript.
  gulp.watch(srcPath + "css/**/*.scss", ["scss"]); // SASS Main.
  gulp.watch(srcPath + "css/**/_*.scss", ["scss"]); // SASS Partials.
  gulp.watch(srcPath + "*.html", ["html"]); // HTML files.
});

// Run server.
gulp.task('server', function() {
  nodemon({
    script: './server.js'
  });
});

gulp.task('default', ['server', 'watch', 'html', 'javascript', 'materialize', 'jquery', 'scss']);
