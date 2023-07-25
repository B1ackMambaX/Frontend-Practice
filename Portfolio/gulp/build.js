// Utils
const gulp = require('gulp'),
      clean = require('gulp-clean'),
      fs = require('fs'),
      changed = require('gulp-changed'),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      rename = require('gulp-rename')
      
// Server
const browserSync = require('browser-sync'); 
      
// HTML     
const fileInclude = require('gulp-file-include'),
      htmlclean = require('gulp-htmlclean'),
      wepbHTML = require('gulp-webp-html');
      
// CSS      
const sass = require('gulp-sass')(require('sass')),
      sourceMaps = require('gulp-sourcemaps'),
      sassGlob = require('gulp-sass-glob'),
      autoprefixer = require('gulp-autoprefixer'),
      groupMedia = require('gulp-group-css-media-queries'),
      webpCSS = require('gulp-webp-css'),
      csso = require('gulp-csso');

// Images
const imagemin = require('gulp-imagemin'),
      webp = require('gulp-webp');

// Build
const webpack = require('webpack-stream');

const getPlumberConfig = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error <%= error.message %>',
            sound: false
        })
    };
};

gulp.task('server:build', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
        },
    });  
});

gulp.task('html:build', function(){
    return gulp
        .src(['src/html/**/*.html', '!src/html/blocks/*.html'])
        .pipe(changed('./dist/'))
        .pipe(plumber(getPlumberConfig('HTML')))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(wepbHTML())
        .pipe(htmlclean())
        .pipe(gulp.dest('dist/'));
});

gulp.task('styles:build', function() {
    return gulp
        .src('src/scss/*.scss')
        .pipe(changed('./dist/css'))
        //.pipe(plumber(getPlumberConfig('Styles')))
        .pipe(sourceMaps.init())
        .pipe(autoprefixer())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(webpCSS())
        .pipe(groupMedia())
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(csso())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js:build', function() {
    return gulp
        .src('src/js/*.js')
        .pipe(changed('./dist/js'))
        .pipe(plumber(getPlumberConfig('JS')))
        .pipe(webpack(require('./../webpack/webpack.config.prod.js')))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images:build', function() {
    return gulp
        .src('src/img/**/*')
        .pipe(changed('./dist/img'))
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))

        .pipe(gulp.src('src/img/**/*'))
        .pipe(changed('./dist/img'))
        .pipe(imagemin({
            verbose: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts:build', function() {
    return gulp
        .src('src/fonts/**/*')
        .pipe(changed('./dist/fonts'))
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('files:build', function() {
    return gulp
        .src('src/files/**/*')
        .pipe(changed('./dist/files'))
        .pipe(gulp.dest('dist/files'));
});

gulp.task('icons:build', function() {
    return gulp
        .src('src/icons/**/*')
        .pipe(changed('./dist/icons'))
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('clean:build', function(done) {
    if(fs.existsSync('dist/')) {
        return gulp
        .src('dist/', { read: false })
        .pipe(clean());
    }
    done();
});