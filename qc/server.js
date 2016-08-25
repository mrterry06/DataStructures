var express 	= require('express');
var app 		= express();
var morgan 		= require('morgan');
var mongojs		= require('mongojs'); 	
var dburl		= "mongodb://qcair:qcairgc2016@ds017193.mlab.com:17193/qcair"; 		
var dpres 		= mongojs(dburl, ['president']);
var dusers 		= mongojs(dburl, ['users']);
var dcontacts	= mongojs(dburl, ['contacts']);
var dcalendar	= mongojs(dburl, ['calendar']);
var bcrypt   	= require('bcryptjs');
var nodemailer	= require('nodemailer');
var bodyParser 	= require('body-parser');
var util	 	= require('util');
var braintree	= require('braintree');
var requestedNonce;

// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "bzb26s8km9shdzbq",
//   publicKey: "hm2qy8b8c3cjvdd2", 
//   privateKey: "db4de26316d377c153e24384c676bd5d"
// });


var gateway = braintree.connect({
  environment: braintree.Environment.Production,
  merchantId: "td3pg3ndnt7nz4g7",
  publicKey: "px75h6q828cr77kk",
  privateKey: "b3337d1f9406cab2f4841dbcc58c598a"
});

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());



dpres.on('error', function (err) {
	console.log('database error', err)
});
 
dpres.on('connect', function () {
	console.log('database connected, collection pres established')
});

dusers.on('error', function (err) {
	console.log('database error', err)
});
 
dcontacts.on('connect', function () {
	console.log('database connected, collection contacts established')
});

dcontacts.on('error', function (err) {
	console.log('database error', err)
});
 
dusers.on('connect', function () {
	console.log('database connected, collection users established')
});

dcalendar.on('error', function (err) {
	console.log('database error', err)
});
 
dcalendar.on('connect', function () {
	console.log('database connected, collection calendar established')
});

app.use(morgan('dev'));

var smtpConfig = { 
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'quadcitiesair@gmail.com',
		pass: 'qcairgc2016'
	}
};

var transporter = nodemailer.createTransport(smtpConfig);
	
	
 app.post('/mail', function(req, res){
 	var element = '<p>' + req.body.content + '<br>' + req.body.email + " " + req.body.phone + '</p>';
 	var tips = '"' + req.body.name + '"' + ' '  + '<' + req.body.email + '>';
 	var mailOption = {
	from: tips,
	to: 'qcair@qcair.org',
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


app.put('/pres/:id', function(req, res){
	console.log(req);
	var id = req.params.id;
	console.log(id);
	bcrypt.genSalt(12, function(err, salt){
		bcrypt.hash(req.body.password, salt, function(err, hash){
			console.log(hash);
			dpres.president.findAndModify({
				query: {_id: mongojs.ObjectId(id)},
				update: {$set: {username: req.body.username, password: hash}}, 
				new: true
			}, function(err, doc){
				res.json(doc);
			});
		});
	});
});

app.post('/admin', function(req, res){
	console.log(req.body.user);
	bcrypt.genSalt(12, function(err, salt){
		bcrypt.hash(req.body.pass, salt, function(err, hash){
			console.log(hash);
			dusers.users.insert({user : req.body.user, pass: hash}, function(err, data){
				err ? console.log(err) : res.json(data);
			});
		});
	});
});

app.get('/admin', function(req, res){
	dusers.users.find(function(err, data){
		console.log(data);
		err ? console.log(err) : res.json(data);
	});
});

app.delete('/admin/:id', function(req, res){
		var id = req.params.id;
		console.log(id);
	dusers.users.remove({_id:mongojs.ObjectId(id)}, function(err, data){
		console.log(data);
		res.json(data);
	});
});
app.get('/admin/:id', function(req, res){
	var id = req.params.id;
		console.log(id);
	dusers.users.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		console.log(doc);
		res.json(doc);
	});	
});

app.put('/admin/:id', function(req, res){
	var id = req.params.id;
		console.log(id);
	bcrypt.genSalt(12, function(err, salt){
		bcrypt.hash(req.body.pass, salt, function(err, hash){
			dusers.users.findAndModify({
				query: {_id: mongojs.ObjectId(id)},
				update: {$set: {user: req.body.user, pass: hash}}, 
				new: true
			}, function(err, doc){
				res.json(doc);
			});	
		});
	});
});

app.get('/contact', function(req, res){
	dcontacts.contacts.find(function(err, data){
		console.log(data);
		res.json(data);
	});
});

app.post('/contact', function(req, res){
	console.log(req.body);
	dcontacts.contacts.insert(req.body, function(err, data){
		err ? console.log(err) : res.json(data);
		console.log(data);
	});
});

app.delete('/contact/:id', function(req, res){
	var id = req.params.id;
	dcontacts.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, data){
		console.log(data);
		err ? console.log(err) : res.json(data);
	});
});

app.get('/contact/:id', function(req, res){
	var id = req.params.id;
	dcontacts.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err, data){
		err ? console.log(err) : res.json(data);
	});
});

app.put('/contact/:id', function(req, res){
	var id = req.params.id;
	dcontacts.contacts.findAndModify({
		query:{_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, number: req.body.number, email: req.body.email, address: req.body.address}},
		new: true
	}, function(err, data){
		res.json(data);
	});
});

app.put('/login', function(req, res){
	dusers.users.findOne({user: req.body.user}, function(err, data){
		if(data === null){
			dpres.president.findOne({username: req.body.user}, function(err, docs){
				if(docs === null){
					res.send(false);
				} else{
					bcrypt.compare(req.body.password, docs.password, function(err, result){
						console.log(result);
						result === true ? res.send('president') : res.send(false);
					});
				};
			});
		}else{
			bcrypt.compare(req.body.password, data.pass, function(err, predicate){
				console.log(predicate);
				res.send(predicate);
			});
		}
	});
});

app.get('/events', function(req, res){
	dcalendar.calendar.find(function(err, data){
		console.log(data);
		res.json(data);
	});
});

app.post('/events', function(req, res){
	console.log(req.body);
	dcalendar.calendar.insert(req.body, function(err, docs){
		err ? console.log(err) : res.json(docs);
		console.log(docs);
	});
});

app.get('/events/:id', function(req, res){
	var id = req.params.id;
	dcalendar.calendar.findOne({_id: mongojs.ObjectId(id)}, function(err, data){
		err ? console.log(err) : res.json(data);
		console.log(data);
	});
});


app.delete('/events/:id', function(req, res){
	var id = req.params.id;
	dcalendar.calendar.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		err ? console.log(err) : res.json(docs);
		console.log(docs);
	});
});

app.put('/events/:id', function(req, res){
	var id = req.params.id;
	dcalendar.calendar.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name , place: req.body.place, date: req.body.date}},
		new: true
	}, function(err, data){
		err ? console.log(err) : res.json(data);
	});
});



app.get("/clientToken", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
  	
  	res.send( response.clientToken);

  
  	//res.send(response.clientToken);

  });
});



app.post("/checkout", function (req, res) {
	console.log(req.body);
	var amount = req.body.amount;
	console.log(req.body);
	console.log(req.body.checkout);
	console.log(req.body.payment_method_nonce);

  var nonceFromTheClient = req.body.payment_method_nonce;

  console.log("Below Here");
  console.log(nonceFromTheClient);
  // Use payment method nonce here
  gateway.transaction.sale({
  amount: req.body.amount,
  paymentMethodNonce: nonceFromTheClient,
  options: {
    submitForSettlement: true
  }
	}, function (err, result) {
		if(result === undefined || result.transaction === undefined){
			console.log(err);
			console.log(result);
			res.redirect("/#/processRed");
		}else{
				console.log(result.transaction.status);
			 	var tips = '"' + req.body.name + '"' + ' '  + '<' + req.body.email + '>';
			 	var mailOption = {
				from: tips,
				to: 'qcair@qcair.org',
				subject: 'Donation' ,
				text: 'Donation Information',
				html: JSON.stringify(req.body)
			};
			transporter.sendMail(mailOption, function(err, info){
				if(err){console.log(err);
					res.send(false);
				}else{
					console.log('Message sent: ' + info.response );

					if(result.transaction.status === 'submitted_for_settlement'){
						res.redirect('/#/processGreen');
					} else{
						res.redirect('/#/processRed');
					};
					}
				});
			
		}
	});
});

var port = 8080;

app.use(express.static(__dirname + '/qcair'))
	.listen(process.env.PORT || port, function(){
		console.log('Your server is up and running on ' + port);
	});
