angular.module('bloomApp.controllers', ['angularModalService'])
	.controller('mainCtrl', function($scope, $http, $state, buSignOrJoin, ModalService){

		$scope.openSplashModal = function(data, controller){

			buSignOrJoin.introModal(data, controller);

		}

	})
	.controller('buVideoCtrl', function($scope, $state, $http){


	})
	.controller('signUpModalCtrl', function($scope, $state, $http, close, $timeout){

		$scope.close = function(result){
	            		close(result, 500);
	            		console.log("Hey you are here");
	            		$timeout(function() {
	            			$state.go("buProfileForm");
	            		}, 1000);
	            	}

		$scope.test = function(){
			console.log("signUpModalCtrl is successfully implemented");
		}
	})
	.controller('signInModalCtrl', function($scope, $state, $http, close, $timeout){

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