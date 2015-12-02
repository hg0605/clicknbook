angular.module('authservice',[])

.factory('auth',function($http,$q,authtoken){
	


	var authfactory={};

	authfactory.merchantlogin=function(username,password){
//console.log(username);
//console.log(password);
	return $http.post('/api/loginmerchant',{
	username:username,
	password:password
	}).success(function(data){

	authtoken.setmerchantToken(data.mertoken);
	return data;
	})
	}

authfactory.logout=function(){
	
	authtoken.setmerchantToken();
}

authfactory.ismerchantloggedin=function(){
	
if(authtoken.getmerchantToken())
return true;
else
return false;

}
authfactory.getuser=function(){

	if(authtoken.getmerchantToken())
		{console.log("chal rha hai");
			return $http.get('/api/me');}
	else
		return $q.reject({message :"Merchant has no token"});
}

return authfactory;
})


.factory('authtoken',function($window){

var authtokenfactory={};
authtokenfactory.getmerchantToken=function(){
	return $window.localStorage.getItem('tokenmerchant');
}
authtokenfactory.setmerchantToken=function(token){
	if(token)
		$window.localStorage.setItem('tokenmerchant',token);
	else
		$window.localStorage.removeItem('tokenmerchant');
}

return authtokenfactory;
})

.factory('user',function($http){

var userfactory={};

userfactory.create=function(userData){
	console.log(userData);
	return $http.post('/api/signupmerchant',userData);
}
return userfactory;
})

.factory('authinterceptor',function($q,$location,authtoken) {
	var interceptorfactory={};

	interceptorfactory.request=function(config){

		
		var token=authtoken.getmerchantToken();

	if(token){
		config.headers['x-access-token']=token;
	}
	 
	return config;
	};

interceptorfactory.responseerror=function(response){

	if(response.status==403)
		$location.path('/home');
	return $q.reject(response);
}
return interceptorfactory;
})

.factory('services',function($q,$window,$http){

var servicefactory={};
var merid=$window.localStorage.getItem('merchantid');
console.log(merid);
servicefactory.createservice=function(serviceData,location){
	console.log("create"+location);
	return $http.post('/api/addservice',{

merchantid:merid,
name:serviceData.name,
cost:serviceData.cost,
starttime:serviceData.starttime,
endtime:serviceData.endtime,
lat:location.latitude,
lng:location.longitude


	});
}

servicefactory.updateservice=function(serviceData,id){
	var merid=$window.localStorage.getItem('merchantid');
	return $http.post('/api/updateservice',{

id:id,
merchantid:merid,
name:serviceData.name,
cost:serviceData.cost,
starttime:serviceData.starttime,
endtime:serviceData.endtime


	});
}

servicefactory.viewservice=function(){
	var merid=$window.localStorage.getItem('merchantid');
console.log(merid);
	return $http.post('/api/servicemerchant',{

merchantid:merid,


	});
}
servicefactory.viewappoint=function(){
	var merid=$window.localStorage.getItem('merchantid');
//console.log(merid);
	return $http.post('/api/bookingmerchant',{

merchantid:merid


	});
}
servicefactory.updatebookingstatus=function(id,status1){
console.log(status1);
return $http.post('/api/updatebookingstatus',{

id:id,
status:status1

	});

}
servicefactory.servicebyid=function(id){
	//var merid=$window.localStorage.getItem('merchantid');
//console.log(merid);
	return $http.post('/api/servicebyid',{

serviceid:id


	});
}
servicefactory.customerbyid=function(id){
	//var merid=$window.localStorage.getItem('merchantid');
//console.log(merid);
	return $http.post('/api/customerbyid',{

id:id


	});
}
servicefactory.merchantlocationbyid=function(id){

return $http.post('/api/merchantlocationbyid',{

merchantid:id	
});


}
servicefactory.deleteservicebyid=function(id){
	//var merid=$window.localStorage.getItem('merchantid');
//console.log(merid);
	return $http.post('/api/deleteservice',{

id:id


	});
}

servicefactory.validatepaycode=function(bookingid,paycode){
//console.log(username);
//console.log(password);
	return $http.post('/api/paycode',{
	bookingid:bookingid,
	paycode:paycode
	}).success(function(data){

	
	return data;
	})
	}
return servicefactory;
});