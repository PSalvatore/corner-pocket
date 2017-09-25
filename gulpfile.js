var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


gulp.task('styles', function() {
    return sass('./resources/assets/sass/styles.scss')
    .on('error', sass.logError)
    .pipe(plumber())
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cleancss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/styles'))
    .pipe(notify({message: 'SCSS Compiled!', onLast: true}));
});

gulp.task('scripts', function() {
    return gulp.src('./resources/assets/scripts/*.js')
    .pipe(plumber())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(notify({message: 'Scripts Compiled!', onLast: true}));
});

gulp.task('watch', function() {
    gulp.watch(['./resources/assets/scss/*.scss', './resources/assets/scss/**/*.scss'], ['styles']);
    gulp.watch(['./resources/assets/scripts/*.js', './resources/assets/scripts/**/*.scss'], ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);
