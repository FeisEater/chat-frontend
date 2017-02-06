const gulp = require("gulp");
const livereload = require("gulp-livereload");

gulp.task("watch:all", ["build"], () => {
  livereload.listen();
  // if you use absolute path(./src) watch isn't notified by file creation/deletion
  gulp.watch("src/app/**/*.js", ["build-js-min"]);
  gulp.watch("src/app/**/*.css", ["build-css"]);
  gulp.watch("src/app/components/**/*.html", ["build-html"]);
  // this doesn't work for some reason TODO
  // gulp.watch("src/bower_components/**/*", ["build-bower"]);
});
