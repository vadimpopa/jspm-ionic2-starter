'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sassResolver = require('./sassresolver.js');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: []
};

// Compile SASS with sourcemaps + livereload.
gulp.task('sass', function() {
  gulp.src(global.paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sassResolver({systemConfig: global.paths.systemConfig}))
    //.pipe(sass({includePaths: includePaths}))
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(global.paths.css))
    .pipe(connect.reload());
});