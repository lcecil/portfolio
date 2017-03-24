'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('rename');

let paths = {
  sass: {
    input: 'styles/sass/**/*.scss',
    output: 'styles/generated/'
  }
};

gulp.task('sass', function () {
  gulp.src(paths.sass.input)
    .pipe(sass())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest(paths.sass.output));
});

gulp.task('default', ['sass']);
