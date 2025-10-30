// Use CommonJS syntax since "type": "module" is set in package.json

const { src, dest, series, parallel } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const terser = require('gulp-terser');      // For JS minification
const rename = require('gulp-rename');
const del = require('del');                 // For cleaning the dist folder

// 🧹 Clean the dist folder
function clean() {
  return del(['dist']);
}

// 🎨 Minify and combine CSS files
function styles() {
  return src('src/css/**/*.css')            // Adjust to your folder structure
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/css'));
}

// ⚙️ Minify and combine JS files
function scripts() {
  return src('src/js/**/*.js')              // Adjust to your folder structure
    .pipe(concat('scripts.js'))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/js'));
}

// 📦 Copy static files (HTML, images, etc.)
function copy() {
  return src(['src/**/*', '!src/{css,js}/**/*'])
    .pipe(dest('dist'));
}

// 🚀 Default task
exports.default = series(
  clean,
  parallel(styles, scripts, copy)
);
