angular.module('bloomApp.controllers', ['angularModalService'])
	.controller('mainCtrl', function($scope, $http, $state, buSignOrJoin, ModalService){

		$scope.openSplashModal = function(data){

			buSignOrJoin.introModal(data);

		}

	})
	.controller('buVideoCtrl', function($scope, $state, $http){


	});