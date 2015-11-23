angular.module('Myapp',['appRoutes','mainCtrl','authservice','userCtrl','userService','harsh'])


.config(function($httpProvider){


	$httpProvider.interceptors.push('authinterceptor');
})