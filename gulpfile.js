'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack-stream');

// Paths.
var srcPath = './src/';
var destPath = './dist/';
var modulesPath = './node_modules/';

// Move HTML files.
gulp.task('html', function() {
  gulp.src(srcPath + '*.html')
      .pipe(gulp.dest(destPath));
});

// Compile SASS and move CSS.
gulp.task('scss', function() {
  gulp.src(srcPath + 'css/**/*.scss')
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(destPath + 'css/'));
});

// Process JSX.
gulp.task('jsx', function() {
  gulp.src(srcPath + 'js/index.jsx')
    .pipe(webpack({
      watch: true,
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(gulp.dest(destPath + 'js/'));
});

// Watch Task.
gulp.task("watch", function() {
  gulp.watch(srcPath + 'js/**/*.jsx', ['jsx']); // JSX files.
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

gulp.task('default', ['server', 'watch', 'html', 'scss', 'jsx']);
