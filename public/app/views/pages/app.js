var myApp=angular.module('myApp',['authservice','ngRoute']);
myApp.config(function($httpProvider){


	$httpProvider.interceptors.push('authinterceptor');
});

myApp.config(function($routeProvider,$locationProvider){
$routeProvider.when("/",{
templateUrl:"merviews/home.html",

})
.when("/appoint",{
	templateUrl:"merviews/appoint.html",
})
.when("/home",{
	templateUrl:"merviews/home.html",
})
.when("/setting",{
	templateUrl:"merviews/setting.html",

})
.when("/service",{
	templateUrl:"merviews/addservice.html",

})
.when("/viewservice",{
	templateUrl:"merviews/viewservice.html",

})
.when("/delviewservice",{
	templateUrl:"merviews/viewservice.html",

})
.otherwise({
	redirectTo:"/home"
});

$locationProvider.html5Mode(false);

});

myApp.controller("HeaderCtrl", function($scope,$location,auth,$window,user){

$scope.merchantloggedin=auth.ismerchantloggedin();

$scope.$on('$routeChangeStart',function(){

$scope.merchantloggedin=auth.ismerchantloggedin();	

auth.getuser().then(function(data){
$scope.merchant=data.data;	
console.log("this"+$scope.merchant.name);
});
});

$scope.dologinmerchant=function(){
$scope.processing=true;
$scope.error='';

auth.merchantlogin($scope.logindatamerchant.username,$scope.logindatamerchant.password)
.success(function(data){

$scope.processing=false;
auth.getuser().then(function(data){
$scope.merchant=data.data;	
$window.localStorage.setItem('merchantid',$scope.merchant.id)
});
if(data.success)
{
$('#login_modal').modal('toggle');
	$location.path('/home');
}
else
$scope.error=data.message;
});	
}
$scope.dologout=function(){
	console.log("Logout initiated");
	auth.logout();
$location.path('/home');
}

$scope.signupuser=function(){
	$scope.message="";
	user.create($scope.userData)
	.then(function(response){

		$scope.userData={};
		$scope.message=response.data.message;
		$('#signup_modal').modal('toggle');
		$location.path('/');
	})
}

});


myApp.controller("servicectrl",function($scope,$window,services,$location){

$scope.createservice=function(){
$scope.message="";
services.createservice($scope.serviceData)
.then(function(response){

	$scope.serviceData={};
	$scope.message=response.data.message;
	$location.path('/home');
})


}
$scope.deleteservice=function(service){
$scope.message="";
services.deleteservicebyid(service._id)
.then(function(response){


	$scope.message=response.data.message;
	var index = $scope.services.indexOf(service);
  $scope.services.splice(index, 1);
})


}
$scope.printhello=function(){

	alert("hello");
}
$scope.setid=function(id){

$scope.id=id;
services.servicebyid(id)
.then(function(response){

	
console.log(response.data);
$scope.serviceiddata=response.data;
	//$scope.message=response.data.message;
	
})

}
$scope.printid=function(){
console.log("modal"+$scope.id);	
}
$scope.init=function(){

$scope.viewservice();
console.log("init called");
console.log("harsh"+$scope.services);
}
$scope.viewservice=function(){
$scope.message="";
services.viewservice()
.then(function(response){

	
console.log(response.data);
$scope.services=response.data;
	//$scope.message=response.data.message;
	
})


}
});