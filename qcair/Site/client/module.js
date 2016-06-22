var app = angular.module('myApp', ['ngRoute'])

.controller('myCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	
		$scope.hello = 'hello there';

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
	   		$scope.response = "I'm sorry, there was a problem while sending your message, please try again!"
	   	});
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
			templateUrl: './views/volunteer.html'
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
			templateUrl: './views/login.html'
		})
		.when('/dashboard', {
			templateUrl: './views/dashboard.html'
	    })
	    .when('/predAccess', {
	    	resolve: {
				"check": function($location, $rootScope){
					if(!$rootScope.predAccess){
						$location.path('/login');
					}
				}
			},
	    	templateUrl: './views/predAccess.html'
	    })
	    .when('/adminAccess', {
	    	resolve: {
				"check": function($location, $rootScope){
					if(!$rootScope.adminAccess){
						$location.path('/login');
					}
				}
			},
	    	templateUrl: './views/adminAccess.html'
	    })
});


