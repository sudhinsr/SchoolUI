'use strict';
/// <binding Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver'),
    debug = require('gulp-debug'),
    sass = require('gulp-sass');

var paths = {
    webroot: "./"
};
paths.approotjs = paths.webroot + "app.js";
paths.appjs = paths.webroot + "app/**/*.js";
paths.appminJs = paths.webroot + "app/**/*.min.js";
paths.js = paths.webroot + "Scripts/**/*.js";
paths.minJs = paths.webroot + "Scripts/**/*.min.js";
paths.css = paths.webroot + "Styles/**/*.css";
paths.minCss = paths.webroot + "Styles/**/*.min.css";
paths.concatJsDest = paths.webroot + "Scripts/lib.min.js";
paths.concatappJsDest = paths.webroot + "Scripts/site.min.js";
paths.concatCssDest = paths.webroot + "Styles/site.min.css";


gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    gulp.src(["!" + paths.concatappJsDest, "!" + paths.concatJsDest, paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
       // .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:devjs", function () {
    gulp.src([paths.appjs, "!" + paths.appminJs, paths.approotjs], { base: "." })
        .pipe(concat(paths.concatappJsDest))
        //.pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:watch", function () {
    gulp.watch([paths.appjs, "!" + paths.appminJs, paths.approotjs], ["min:devjs"]);
});

gulp.task("min:css", function () {
    gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:devjs", "min:css"]);

gulp.task('sass', function () {
    gulp.src('./sass/**/*.scss')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('serve', ["min", "min:watch", "sass:watch"], function () {
    gulp.src('.')
      .pipe(webserver({
          port: 3000,
          //      livereload: true,
          open: true
      }));
});