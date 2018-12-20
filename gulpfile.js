var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src('public/stylesheets/style.scss')
  .pipe(sass())
  .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', () => {
  gulp.watch('public/stylesheets/*.scss', gulp.series('sass'));
});
