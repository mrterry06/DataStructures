angular.module('bloomApp' , ['ui.router', 'bloomApp.controllers', 'bloomApp.services', 'bloomApp.directives', 'angularModalService'])
	.run(function(buSignOrJoin){

	})
	.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider

		//Home View
			.state('home', {
				url: '/',
				templateUrl: 'templates/splash/splash.html',
				controller: 'mainCtrl'
			})
			.state('buProfile', {
				url: '/buProfile',
				templateUrl: 'templates/profile/profile.html'

			})
			.state('buSignUpForm.credentials',{
				url: '/credentials'
			})
			.state('buSignUpForm.profileInfo',{
				//url: '/profileInfo'
			})
			.state('buVideo', {
				url: '/buVideo',
				templateUrl: 'templates/video-chat/video.html',
				controller: 'buVideoCtrl'
			});
	});