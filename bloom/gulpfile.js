var express = require('express');
var app 	= express();
var morgan  = require('morgan');
var port    = 8888;
var mongojs = require('mongojs');
var dburl   = "test";
var db      = mongojs(dburl, ["bloomDB"]);
var bcrypt  = require('bcryptjs');
var bodyParser = require("body-parser");
var gulp 	= require('gulp');
var livereload = require('gulp-livereload');
var passport = require('passport');

app.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended : true
	}))
	.use(morgan('dev'));

db.on('connect', function(){
	console.log("You have connected to Bloom's Database");
});

gulp.task('scripts', function(){
	gulp.src('**/*.js')
	.pipe(livereload());
});

gulp.task('styles', function(){
	gulp.src('**/*.css')
		.pipe(livereload());
	console.log('styles has run');
});

gulp.task('structure', function(){
	gulp.src('**/*.html')
		.pipe(livereload());
	console.log('your structure should reload');	
});


gulp.task('watch', function(){
	livereload.listen();
  gulp.watch('**/*.js', ['scripts']);
  gulp.watch('**/*.css', ['styles']);
  gulp.watch('**/*.html', ['structure']);
});


gulp.task('default', ['scripts', 'styles', 'structure', 'watch']);

app.post('/login', function(req, res){
	passport.authenticate();

});


app.use(express.static(__dirname + '/content'))
	.listen(process.env.PORT || 8000, function(){
		console.log("Your project is running on port " + port);
	});