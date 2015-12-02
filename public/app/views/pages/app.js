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
	//console.log($scope.userData);
	user.create($scope.userData)
	.then(function(response){

		$scope.userData={};
		$scope.message=response.data.message;
		$('#signup_modal').modal('toggle');
		$location.path('/');
	})
}

});


myApp.controller("servicectrl",function($scope,$window,services,$location,$timeout){

var vm=this;
$scope.createservice=function(){
$scope.message="";
var merid=$window.localStorage.getItem('merchantid');

services.merchantlocationbyid(merid)
.then(function(response){

	
console.log(response.data);
vm.merchantlocation=response.data;

services.createservice($scope.serviceData,vm.merchantlocation)
.then(function(response){

	$scope.serviceData={};
	$scope.message=response.data.message;
	$location.path('/home');
})


	//$scope.message=response.data.message;
	
});


}


$scope.updateservice=function(){
$scope.message="";
services.updateservice($scope.serviceiddata,$scope.id)
.then(function(response){

	$scope.serviceiddata={};
	console.log(response.data.message);
	$scope.message=response.data.message;
	$('#myModal').modal('toggle');
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


}
$scope.appointinit=function(){


$scope.viewappoint();

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

$scope.customerdata=function(appoint)
{
var index = $scope.appoints.indexOf(appoint);
$scope.bindstatus=appoint.appointment;
console.log(index);	
$scope.customerfetchdata(index,appoint.customerid);
$scope.servicefetchdata(index,appoint.serviceid);
}

$scope.customer=[];
$scope.customerfetchdata=function(index,id){
$scope.message="";
services.customerbyid(id)
.then(function(response){

	
console.log(response.data);
//$scope.customer=response.data;
$scope.customer.splice(index, 0, response.data);
//console.log("harsh"+$scope.customer);

	//$scope.message=response.data.message;
	
})


}
$scope.servdata=[];

$scope.servicefetchdata=function(index,id){
services.servicebyid(id)
.then(function(response){

	
console.log(response.data);
$scope.servdata.splice(index, 0, response.data);

	
})	
}
$scope.viewappoint=function(){
$scope.message="";
services.viewappoint()
.then(function(response){

	
console.log(response.data);
$scope.appoints=response.data;


	//$scope.message=response.data.message;
	
})


}
vm.merchantlocation=[];
$scope.merchantlocationbyid=function(id){
$scope.message="";
services.merchantlocationbyid(id)
.then(function(response){

	
console.log(response.data);
vm.merchantlocation=response.data;


	//$scope.message=response.data.message;
	
});


}
$scope.updatebookingstatus=function(index,status1){
$scope.message="";
console.log($scope.appoints[index]._id);
services.updatebookingstatus($scope.appoints[index]._id,status1)
.then(function(response){

	
console.log(response.data);

  // anything you want can go here and will safely be run on the next digest.


           $scope.appoints[index].appointment=status1;

        });


$location.path('/appoint');


	//$scope.message=response.data.message;
	



}
$scope.paycode=[];
$scope.validatepaycode=function(id,index){
alert($scope.paycode[index]);
services.validatepaycode(id,$scope.paycode)
.success(function(data){

alert("Harsh"+data.paycode);

if(data.paycode)
{
$scope.updatebookingstatus(index,"Completed");
alert("paycode validated");	
}




});




}
});