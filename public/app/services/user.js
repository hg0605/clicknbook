angular.module('userService',[])

.factory('User',function($http){

var userfactory={};

userfactory.create=function(userData){
	console.log(userData);

console.log(userData);
	return $http.post('/api/signup',{
name: userData.name,
username:userData.username,
password: userData.password,
address: userData.address,
location: userData.location1,
latitude: userData.latitude,
longitude: userData.longitude,
contact: userData.contact,
email: userData.email,
gender: userData.gender



	});
}

userfactory.all=function(){

	return $http.get('/api/users');  
}
return userfactory;
});