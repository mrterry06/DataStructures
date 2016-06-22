var express 	= require('express');
var app 		= express();
var morgan 		= require('morgan');
var gulp 		= require('gulp');
var livereload  = require('gulp-livereload');
var mongojs 	= require('mongojs');
var dburl 		= "mongodb://grant1:grant123@ds017193.mlab.com:17193/qcair";
var db 			= mongojs(dburl, ['users']);
var bcryptjs 	= require('bcryptjs');
var nodemailer	= require('nodemailer');
var bodyParser 	= require('body-parser');


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

db.on('error', function (err) {
	console.log('database error', err)
});
 
db.on('connect', function () {
	console.log('database connected')
});

app.use(morgan('dev'));

var smtpConfig = { 
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'quadcitiesair@gmail.com',
		pass: 'Qcair1234'
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

 

app.use(express.static(__dirname + '/Site/client'))
	.listen(process.env.PORT || 8000, function(){
		console.log('Your server is up and running on http://127.0.0.1:8000/');
	});
