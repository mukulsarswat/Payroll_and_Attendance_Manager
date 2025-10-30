const { src, dest, series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

function minifyCSS() {
  return src('src/css/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(dest('dist/css'));
}

exports.default = series(minifyCSS);
