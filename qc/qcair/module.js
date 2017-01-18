

var app = angular.module('myApp', ['ngRoute'])


.controller('myCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	


$scope.submit = function(){
   	var expression = /\S/g;
   	console.log(expression.test($scope.mail.name));

    if(expression.test($scope.mail.name) === false || $scope.mail.name === undefined || expression.test($scope.mail.phone) === false || $scope.mail.phone === undefined || expression.test($scope.mail.email) === false || $scope.mail.email === undefined || $scope.mail.subject === undefined || expression.test($scope.mail.subject) === false){
   		console.log('Some fields are empty');
   } else{
	   $http.post('/mail', $scope.mail)
	   	.success(function(data){
	   		$scope.response = "Your Message has been sent! We thank you!";
	   		$scope.mail = '';
	   	})
	   	.error(function(data){
	   		$scope.response = "I'm sorry, there was a problem while sending your message, please try again!";
	   	});
   }
};


function refresh(){
		$http.get('/pres')
			.success(function(response){
				$scope.current = response;
				
			})
			.error(function(err){
				console.log(err);
			});
	};
	
	refresh();


$scope.rewrite = function(id){
	$http.get('/pres/', id)
		.success(function(response){
			console.log(response);
		});
		var expression = /\S/g;

if($scope.presi.username === undefined || expression.test($scope.presi.username) === false || $scope.presi.password === undefined || expression.test($scope.presi.password) === false){
	 window.alert('Both fields need to have a value');
	} else {
		console.log(id);

		if($scope.presi.username !== $scope.pre.ucon){
			window.alert('Usernames do not match');
			console.log('Usernames do not match');
		} else if($scope.presi.password !== $scope.pre.pcon){
			window.alert('Passwords do not match');
		} else{
			console.log(id);
			
			$http.put('/pres/' + id, $scope.presi)
			.success(function(){
				console.log("The presidents Credential have changed");
				refresh();
				window.alert('Write Down the Password');
			})
			.error(function(response){
				console.log("the presidents credentials were not changed");
				console.log("Error occured at: " + response);
			});
		}
	}
};


}])
.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: './views/home.html'
		})
		.when('/meetus', {
			templateUrl: './views/meetMe.html'
		})
		.when('/volunteer', {
			controller: 'paymentCtrl',
			templateUrl: './views/volunteer.html'
		})
		.when('/jobs', {
			templateUrl: './views/jobs.html'
		})
		.when('/pip', {
			templateUrl: './views/pip.html'
		})
		.when('/hd', {
			templateUrl: './views/hd.html'
		})
		.when('/rg', {
			templateUrl: './views/rg.html'
		})
		.when('/mission', {
			templateUrl: './views/mission.html'
		})
		.when('/progress', {
			templateUrl: './views/progress.html'
		})
	    .when('/contact', {
	    	templateUrl: './views/contact.html',
	    	controller: 'myCtrl'
	    })
	    .when('/login',{
			templateUrl: './views/login.html',
			controller: 'loginCtrl'
		})
		.when('/dashboard', {
			templateUrl: './views/dashboard.html'
	    })
	    .when('/presLogin', {
	    	templateUrl: './views/presLogin.html',
	    	controller: 'loginCtrl'
	    })
	    .when('/predAccess', {
	    	resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.pres){
					$location.path('/login');
				}
			}
		},
	    	controller: 'presCtrl',
	    	templateUrl: './views/predAccess.html'
	    })
	    .when('/presChange', {
	    
	    	templateUrl: './views/presChange.html',
	    	controller: 'myCtrl'
	    })
	    .when('/adminAccess', {
	    	resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/login');
				}
			}
		},
	    	controller: 'presCtrl',
	    	templateUrl: './views/adminAccess.html'
	    })
	    .when('/processGreen', {
	    	templateUrl: './views/accepted.html'
	    })
	    .when('/processRed', {
	    	templateUrl: './views/declined.html'
	    })
	    .otherwise({
	    	redirectTo: '/'
	    });
});

app.controller('presCtrl', ['$scope', '$http', function($scope, $http){

	

function refresh(){
	$http.get('/admin')
		.success(function(response){
			$scope.admins = response;
			console.log('successfully displayed users');
		})
		.error(function(err){
			console.log('error at  :' + err);
		});
};
	refresh();
	
	$scope.addAdmin = function(){
		$http.post('/admin', $scope.admin).
			success(function(response){
				$scope.admin = '';
				console.log('The database was added too');
				refresh();
			});
	};

	$scope.removeAdmin = function(id){
		console.log(id);
		$http.delete('/admin/' + id)
			.success(function(){
				console.log('Admin has been removed');
					refresh();
			})
			.error(function(err){
				console.log(err);
			});
	}

	$scope.editAdmin = function(id){
		console.log(id);
		$http.get('/admin/' + id)
			.success(function(response){
				$scope.admin = response;
			});
	}

	$scope.updateAdmin = function(){
		console.log($scope.admin._id);
		var id = $scope.admin._id;
		$http.put('/admin/' + id, $scope.admin)
			.success(function(response){
					console.log(response);
					$scope.admin = '';
					console.log("Admin has been updated");
					refresh();
				});
	}

	

	function reload(){
		$http.get('/contact')
		.success(function(response){
			console.log(response);
			$scope.contacts = response;
		})
		.error(function(err){
			console.log(err);
		});
	}

	reload();

	$scope.addContact = function(){
		$http.post('/contact', $scope.contact)
			.success(function(response){
				console.log(response);
				$scope.contact = '';
				reload();
			})
			.error(function(err){
				console.log(err);
			});
	}

	$scope.removeContact = function(id){
		console.log(id);
		$http.delete('/contact/' + id)
		.success(function(response){
			console.log('Contact has been removed');
			reload();
		});
	}

	$scope.editContact = function(id){
		console.log(id);
		$http.get('/contact/' + id)
		.success(function(response){
			$scope.contact = response;
		});
	}

	$scope.updateContact = function(){
		console.log($scope.contact.name);
		var id = $scope.contact._id;
		$http.put('/contact/' + id, $scope.contact)
		.success(function(response){
			console.log(response);
			console.log('Contact has been edited successfully');
			$scope.contact = '';
			reload();
		});
	}

	
function loaded(){
	$http.get('/events').success(function(response){
		console.log(response);
		$scope.events = response;
	});
}
	loaded();
	$scope.addEvent = function(){
		$http.post('/events', $scope.event).success(function(response){
			console.log(response);
			console.log("Your event has been added");
			$scope.event = '';
			loaded();
		});
	}

	$scope.removeEvent = function(id){
		$http.delete('/events/' + id).success(function(res){
			console.log('event has been removed');
			loaded();
		});
	}

	$scope.editEvent = function(id){
		console.log(id);
		$http.get('/events/' + id).success(function(res){
			$scope.event = res;
			console.log(res);
		});
	}

	$scope.updateEvent = function(){
		var id = $scope.event._id;
		$http.put('/events/' + id, $scope.event).success(function(res){
			console.log('Your event has been updated');
			$scope.event = '';
			loaded();
		});
	}


}]);

app.controller('loginCtrl', function($scope, $http, $rootScope, $location){

	$scope.submitAdmin = function(){
		$http.put('/login', $scope.admin)
		.success(function(response){
			console.log(response);
			if(response === true){
			
				$rootScope.loggedIn = true;
				$location.path('/adminAccess');

			} else if(response === "president"){
			
				$rootScope.pres = true;
				$location.path('/predAccess');
				console.log('Im still listening');
			} else{
				$scope.wrong = "Wrong Password or Username";
			}
		})
		.error(function(err){
			console.log(err);
		});
	}

})

	.controller('paymentCtrl', function($scope, $http){
		//$rootScope.onDonate = true;
		//$http.get('/clientToken');

	});

// .controller('paymentCtrl', ['$scope', '$http', function ($scope, $http) {
//     $scope.message = 'Please use the form below to pay:';
//     $scope.message = 'Please use the form below to pay:';
//     $scope.isError = false;
//     $scope.isPaid = false;
//     $scope.showForm = true;
//     $scope.processPayment = function () {
//       $scope.message = 'Processing payment...';
//       $scope.showForm = false;
//       // send request to get token, then use the token to tokenize credit card info and process a transaction
//       $http({
//         method: 'POST',
//         url: '/api/v1/token'
//       }).success(function (data) {
//         // create new client and tokenize card
//         var client = new braintree.api.Client({clientToken: data.client_token});
//         client.tokenizeCard({
//           number: $scope.creditCardNumber,
//           expirationDate: $scope.expirationDate
//         }, function (err, nonce) {
//           $http({
//             method: 'POST',
//             url: '/api/v1/process',
//             data: {
//               amount: $scope.amount,
//               payment_method_nonce: nonce
//             }
//           }).success(function (data) {
//             console.log(data.success);
//             $scope.showForm = false;
//             if (data.success) {
//               $scope.message = 'Payment authorized, thanks.';
//               $scope.isError = false;
//               $scope.isPaid = true;
//             } else {
//               // implement your solution to handle payment failures
//               $scope.message = 'Payment failed: ' + data.message + ' Please refresh the page and try again.';
//               $scope.isError = true;
//             }
//           }).error(function (error) {
//             $scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
//             $scope.isError = true;
//             $scope.showForm = false;
//           });
//         });
//       }).error(function (error) {
//         $scope.message = 'Error: cannot connect to server. Please make sure your server is running.';
//         $scope.isError = true;
//         $scope.showForm = false;
//       });
//     };
//   }]);

