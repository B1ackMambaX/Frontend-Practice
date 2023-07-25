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
const fileInclude = require('gulp-file-include');
      
// CSS      
const sass = require('gulp-sass')(require('sass')),
      sourceMaps = require('gulp-sourcemaps'),
      sassGlob = require('gulp-sass-glob');

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

gulp.task('server:dev', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
        },
    });  
});

gulp.task('html:dev', function(){
    return gulp
        .src(['src/html/**/*.html', '!src/html/blocks/*.html'])
        .pipe(changed('./dist/', {hasChanged: changed.compareContents}))
        .pipe(plumber(getPlumberConfig('HTML')))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('styles:dev', function() {
    return gulp
        .src('src/scss/*.scss')
        .pipe(changed('./dist/css'))
        .pipe(plumber(getPlumberConfig('Styles')))
        .pipe(sourceMaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js:dev', function() {
    return gulp
        .src('src/js/*.js')
        .pipe(changed('./dist/js'))
        .pipe(plumber(getPlumberConfig('JS')))
        .pipe(webpack(require('./../webpack/webpack.config.dev.js')))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('images:dev', function() {
    return gulp
        .src('src/img/**/*')
        .pipe(changed('./dist/img'))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('fonts:dev', function() {
    return gulp
        .src('src/fonts/**/*')
        .pipe(changed('./dist/fonts'))
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('files:dev', function() {
    return gulp
        .src('src/files/**/*')
        .pipe(changed('./dist/files'))
        .pipe(gulp.dest('dist/files'))
        .pipe(browserSync.stream());
});
gulp.task('icons:dev', function() {
    return gulp
        .src('src/icons/**/*')
        .pipe(changed('./dist/icons'))
        .pipe(gulp.dest('dist/icons'))
        .pipe(browserSync.stream());
});

gulp.task('clean:dev', function(done) {
    if(fs.existsSync('dist/')) {
        return gulp
        .src('dist/', { read: false })
        .pipe(clean());
    }
    done();
});

gulp.task('watch:dev', function() {
    gulp.watch('src/scss/**/*.+(scss|sass)', gulp.series('styles:dev'));
    gulp.watch('src/img/**/*').on('add', gulp.series('images:dev'));
    gulp.watch('src/fonts/**/*').on('add', gulp.series('fonts:dev'));
    gulp.watch('src/files/**/*').on('add', gulp.series('files:dev'));
    gulp.watch('src/icons/**/*').on('add', gulp.series('icons:dev'));
    gulp.watch('src/**/*.html').on('change', gulp.series('html:dev'));
    gulp.watch('src/js/**/*.js').on('change', gulp.series('js:dev'));
});