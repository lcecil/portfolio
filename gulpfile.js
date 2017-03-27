'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

let paths = {
  sass: {
    input: 'app/styles/sass/**/*.scss',
    output: 'app/styles/generated/'
  }
};

gulp.task('sass', function () {
  gulp.src(paths.sass.input)
    .pipe(sass())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(paths.sass.output));
});

gulp.watch(paths.sass.input, ['sass']);

gulp.task('default', ['sass']);
