angular.module('authservice',[])



.factory('Auth',function($http,$q,AuthToken){

var authfactory={};

authfactory.login=function(username,password){


	return $http.post('/api/login',{

		username:username,
		password:password
	})
	.success(function(data){


		AuthToken.setToken(data.token);
		return data;
	})
}
authfactory.logout=function(){

	AuthToken.setToken();
	AuthToken.setmerchantToken();
}
authfactory.merchantlogin=function(username,password){


	return $http.post('/api/loginmerchant',{

		username:username,
		password:password
	})
	.success(function(data){


		AuthToken.setmerchantToken(data.token);
		return data;
	})
}
authfactory.merchantlogout=function(){

	AuthToken.setmerchantToken();
}
authfactory.isloggedin=function(){

	if(AuthToken.getToken())
		return true;
	else
		return false;
}
authfactory.ismerchantloggedin=function(){

	if(AuthToken.getmerchantToken())
		return true;
	else
		return false;
}
authfactory.getuser=function(){

	if(AuthToken.getToken())
		return $http.get('/api/me');
	else
		return $q.reject({message :"User has no token"});
}
authfactory.getmerchant=function(){

	if(AuthToken.getmerchantToken())
		return $http.get('/api/merme');
	else
		return $q.reject({message :"Merchant has no token"});
}
return authfactory;
})


.factory('AuthToken',function($window){

var authtokenfactory={};
authtokenfactory.getToken=function(){
	return $window.localStorage.getItem('token');
}
authtokenfactory.getmerchantToken=function(){
	return $window.localStorage.getItem('tokenmerchant');
}
authtokenfactory.setToken=function(token){

	if(token)
		$window.localStorage.setItem('token' ,token);
	else
		$window.localStorage.removeItem('token');
}
authtokenfactory.setmerchantToken=function(token){

	if(token)
		$window.localStorage.setItem('tokenmerchant' ,token);
	else
		$window.localStorage.removeItem('tokenmerchant');
}
return authtokenfactory;
})

.factory('authinterceptor',function($q,$location,AuthToken) {
	var interceptorfactory={};

	interceptorfactory.request=function(config){

		var token=AuthToken.getToken();
		var token1=AuthToken.getmerchantToken();

	if(token){
		config.headers['x-access-token']=token;
	}
	if(token1){
		config.headers['x-access-tokenmerchant']=token;
	} 
	return config;
	};

interceptorfactory.responseerror=function(response){

	if(response.status==403)
		$location.path('/login');
	return $q.reject(response);
}
return interceptorfactory;
})  

.factory('dataservice',function($q,$window,$http){

var servicefactory={};

servicefactory.servicenearbuy=function(lat,lng){
	//var merid=$window.localStorage.getItem('merchantid');
//console.log(merid);
	return $http.post('/api/servicenearbuy',{

lat:lat,
lng:lng


	});
}
servicefactory.createbooking=function(service,btime){

return $http.post('/api/addbooking',{

serviceid : service._id,



	});



}
servicefactory.servicebookingtime=function(id){
	//var merid=$window.localStorage.getItem('merchantid');
//console.log(merid);
	return $http.post('/api/servicebookingtime',{

id : id


	});
}

return servicefactory;
});