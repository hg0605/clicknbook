angular.module('Myapp1',['appRoutes','mainCtrl','authservice','userCtrl','userService','harsh']);

.config(function($httpProvider){


	$httpProvider.interceptors.push('authinterceptor');
})

