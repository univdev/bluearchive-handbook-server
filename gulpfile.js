'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const environment = require('./environment');

gulp.task('default', () => {
  return new Promise((resolve, reject) => {
    nodemon({
      script: `${environment.src.server}/index.js`,
      watch: environment.src.server,
    });
    return resolve();
  });
});