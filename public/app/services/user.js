angular.module('userService',[])

.factory('User',function($http){

var userfactory={};

userfactory.create=function(userData){
	return $http.post('/api/signup',userData);
}

userfactory.all=function(){

	return $http.get('/api/users');  
}
return userfactory;
});