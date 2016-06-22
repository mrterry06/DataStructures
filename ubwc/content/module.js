
var app = angular.module('myApp', [])

	.controller('myCtrl', ['$scope', '$http', function($scope, $http){
		
		$scope.submit = function(){
			
		   	var expression = /\S/g;
   	

	    if(expression.test($scope.mail.name) === false || $scope.mail.name === undefined || expression.test($scope.mail.phone) === false || $scope.mail.phone === undefined || expression.test($scope.mail.email) === false || $scope.mail.email === undefined || $scope.mail.subject === undefined || expression.test($scope.mail.subject) === false){
	   		console.log('Some fields are empty');
	   		window.alert('All fields need values');
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

	}

	$scope.hello="Hello";

}]);


