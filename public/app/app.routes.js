angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
	$routeProvider
	 .when('/',{
	 templateUrl:'/app/views/pages/home.html',
	 })
	.when('/login',{

		templateUrl:'app/views/pages/login.html'
	})
	.when('/home',{

	 	templateUrl:'app/views/pages/home.html'
	 })
	.when('/logout',{

	 	templateUrl:'app/views/pages/home.html'
	 })
.when('/signup',{

		templateUrl:'app/views/pages/signup.html'
	})
.when('/userportal',{

		templateUrl:'app/views/pages/userportal.html'
	})
$locationProvider.html5Mode(true);



});