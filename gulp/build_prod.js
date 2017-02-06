const gulp = require("gulp");
const del = require("del");
const annotate = require("gulp-ng-annotate");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("clean:dist", function () {
  return del(["./dist/**/*"]);
});

gulp.task("build:prod", ["clean:dist"], () => {
  return gulp.start(["build-js-min:prod", "build-css:prod", "build-html:prod", "build-bower:prod"]);
});

gulp.task("build-js-min:prod", () => {
  return gulp.src("./src/app/**/*.js")
    .pipe(concat("app.min.js"))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"));
});

gulp.task("build-css:prod", () => {
  return gulp.src("./src/app/**/*.css")
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("build-html:prod", () => {
  return gulp.src("./src/app/components/**/*.html")
    .pipe(gulp.dest("./dist/templates"));
});

gulp.task("build-bower:prod", () => {
  return gulp.src(["./src/bower_components/**/*.min.*", "./src/bower_components/**/fonts/*"])
    .pipe(gulp.dest("./dist/bower"));
});
