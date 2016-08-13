var gulp  		= require('gulp');
var livereload  = require('gulp-livereload');


gulp.task('styles', function(){
	gulp.src('**/*.css')
		.pipe(livereload());
		console.log("styles has loaded");
});

gulp.task('structure', function(){
	gulp.src('**/*.html')
		.pipe(livereload());
		console.log('html has loaded');
});

gulp.task('behave', function(){
	gulp.src('**/*.js')
		.pipe(livereload());
		console.log("the behavior has reloaded");
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('**/*.js');
	gulp.watch('**/*.css');
	gulp.watch('**/*.html');
});


gulp.task('default', ['styles', 'structure', 'behave','watch']);