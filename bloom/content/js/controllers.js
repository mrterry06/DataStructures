angular.module('bloomApp.controllers', ['angularModalService'])
	.controller('mainCtrl', function($scope, $http, $state, buSignOrJoin, ModalService){

		$scope.openSplashModal = function(data, controller){

			buSignOrJoin.introModal(data, controller);

		}

	})
	.controller('buVideoCtrl', function($scope, $state, $http){


	})
	.controller('signUpModalCtrl', function($scope, $state, $http, close, $timeout){
	
		$scope.firstTab = true;

		$scope.close = function(result){
	            		close(result, 500);
	            	}

	    $scope.submitInfo = function(result, user){

	    	console.log(user);

	    	console.log("Submiting user");
	    	close(result, 500);
	    	$timeout(function(){
	    		$state.go("buProfile");
	    	}, 300);
	    	
	    }        	

	    $scope.next = function(test){
	    	console.log(test);

	    	if ($scope.thirdTab){
	    		$scope.thirdTab = false;
	    		$scope.finalTab = true;
	    	}


	    	if ($scope.secondTab){
	    		$scope.secondTab = false;
	    		$scope.thirdTab = true;
	    	}

	    	if ($scope.firstTab){
	    		$scope.firstTab = false;
	    		$scope.backButton = true;
	    		$scope.secondTab = true;
	    	}
	    } 

	    $scope.test = function(){
	    	if($scope.man){
	    		return false;
	    	} else {
	    		return true;
	    	}
	    }

	    $scope.back = function(test){
	    	console.log(test);

	    	if ($scope.secondTab){
	    		$scope.secondTab = false;
	    		$scope.backButton = false;
	    		$scope.firstTab = true;
	    	}

	    	if ($scope.thirdTab){
	    		$scope.thirdTab = false;
	    		$scope.secondTab = true;
	    	}	  

	    	if ($scope.finalTab){
	    		$scope.finalTab = false;
	    		$scope.thirdTab = true;
	    	}

	    } 

	})
	.controller('signInModalCtrl', function($scope, $state, $http, close, $timeout){

		$scope.logIn = function(user){
			console.log(user);

			console.log("You are logging in");

			close(false, 500);
			$state.go('buProfile');
		}

		$scope.close = function(result){
						close(result, 500);
						$timeout(function(){
							$state.go('buProfileForm');
						}, 500);
					}

		$scope.test = function(){
			console.log("signInModalCtrl is successfully implemented");
		}
	});