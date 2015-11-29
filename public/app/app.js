angular.module('Myapp',['appRoutes','mainCtrl','authservice','userCtrl','userService','harsh','ngMap'])


.config(function($httpProvider){


	$httpProvider.interceptors.push('authinterceptor');
})