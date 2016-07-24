angular.module('bloomApp' , ['ui.router', 'bloomApp.controllers', 'bloomApp.services', 'bloomApp.directives', 'angularModalService'])
	.run(function(buSignOrJoin){

	})
	.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'js/views/splash.html',
				controller: 'mainCtrl'
			})
			.state('buProfileForm', {
				url: '/buProfileForm',
				templateUrl: 'js/views/setup-profile.html'

			})
			.state('buSignUpForm.credentials',{
				url: '/credentials'
			})
			.state('buSignUpForm.profileInfo',{
				//url: '/profileInfo'
			})
			.state('buVideo', {
				url: '/buVideo',
				templateUrl: 'js/views/video-chat/video.html',
				controller: 'buVideoCtrl'
			});
	});