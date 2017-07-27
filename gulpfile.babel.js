const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('copy-css', function () {
	return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/bootstrap/dist/css/bootstrap.min.css.map'])
		.pipe(gulp.dest('./_public/css'));
});
 
gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./_public/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('watch', ['sass-watch']);

gulp.task('default', ['copy-css', 'sass']);
