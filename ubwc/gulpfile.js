
var gulp        = require('gulp');
var livereload  = require('gulp-livereload');
var express		= require('express');
var app 		= express();
var morgan		= require('morgan');
var nodemailer  = require('nodemailer');
var bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({
		extended: true
		}));

app.use(bodyParser.json());


app.use(morgan('dev'));



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

var smtpConfig = { 
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'mrterry06@gmail.com',
		pass: 'xxxxxxx'
	}
};

var transporter = nodemailer.createTransport(smtpConfig);
	
	
 app.post('/mail', function(req, res){
 	var element = '<p>' + req.body.content + '<br>' + req.body.email + " " + req.body.phone + '</p>';
 	var tips = '"' + req.body.name + '"' + ' '  + '<' + req.body.email + '>';
 	var mailOption = {
	from: tips,
	to: 'mrterry06@gmail.com',
	subject: req.body.subject ,
	text: req.body.email,
	html: element
};

transporter.sendMail(mailOption, function(err, info){
	if(err){console.log(err);res.send(false);}else{console.log('Message sent: ' + info.response );res.send(true);}});});

 app.get('/pres', function(req, res){
 	dpres.president.find(function(err, data){
 		console.log(data);
 		res.json(data);
 	});
 });

 app.use(express.static(__dirname + '/content'))
	.listen(8000, function(){
		console.log('Your project is on port 8000');
	});
