var express 	= require('express');
var app 		= express();
var morgan 		= require('morgan');
var mongojs		= require('mongojs'); 	
var dburl		= "qcair"; 		
var dpres 		= mongojs(dburl, ['president']);
var dusers 		= mongojs(dburl, ['users']);
var dcontacts	= mongojs(dburl, ['contacts']);
var dcalendar	= mongojs(dburl, ['calendar']);
var bcrypt   	= require('bcryptjs');
var nodemailer	= require('nodemailer');
var bodyParser 	= require('body-parser');
var braintree	= require('braintree');

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
		user: 'mrterry06@gmail.com',
		pass: 'Elfin123'
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
    res.send(response.clientToken);
  });
});

app.post("/checkout", function (req, res) {
	console.log(req.body);
	var amount = req.body.amount;
  var nonceFromTheClient = req.body.payment_method_nonce;
  // Use payment method nonce here
  gateway.transaction.sale({
  amount: amount,
  paymentMethodNonce: nonceFromTheClient,
  options: {
    submitForSettlement: true
  }
	}, function (err, result) {
		if(result === undefined || result.transaction === undefined){
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
			mailOption = {
				from: 'qcair@qcair.org',
				to: req.body.email
				subject: 'Donation Reciept',
				text: "This is proof of your transaction",
				html: JSON.stringify(req.body)
			};
			transporter.sendMail(mailOption, function(err, info){
				if(err){
					res.send(false);
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
