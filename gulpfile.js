// Gulp plugins
const gulp       = require('gulp');
const webpack    = require('gulp-webpack');

// Source Folders
const baseDir    = 'src';
const jsFiles    = baseDir + '/js/**/*.js';

// Build Folders
const buildFolder = 'dist';
const buildJsFolder    = buildFolder + '/js';


/**
 * Runs by default
 */
gulp.task('default', [
  'scripts',
  'copy'
], () => {});


/**
 * Minifies JS files for production
 */
gulp.task('scripts', () => {
  return gulp.src(jsFiles)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(buildJsFolder));
});

gulp.task('copy', function () {
  return gulp.src([
    baseDir + '/**',
    '!' + jsFiles
  ], {dot: true})
  .pipe(gulp.dest(buildFolder));
});

/**
 * Watches for changes in files and does stuff
 */
gulp.task('watch', ['default'], () => {
  gulp.watch([
    baseDir + '/**',
    '!' + jsFiles
  ], {dot: true}, ['copy']);
  gulp.watch([jsFiles],    ['scripts']);
});
