app.controller('myCtrlContact', ['$scope', '$http', function($scope, $http){

	$scope.hello = 'hello there';

$scope.submit = function(){
   if($scope.mail.name === '' || $scope.mail.phone === '' || $scope.mail.email === ''){
   	alert('Fill out the required fields');
   }
   $http.post('/mail', $scope.mail);
   $scope.response = "Your Message has been sent";
};

}]);
