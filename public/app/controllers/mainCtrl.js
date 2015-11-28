

angular.module('mainCtrl',[])

.controller('MainController',function($rootScope,$location,Auth,goyal,$scope,$window){

var vm=this;

$scope.lng='';

vm.loggedin=Auth.isloggedin();
vm.merchantloggedin=Auth.ismerchantloggedin();
$rootScope.$on('$routeChangeStart',function(){

vm.loggedin=Auth.isloggedin();
vm.merchantloggedin=Auth.ismerchantloggedin();
Auth.getuser()
.then(function(data){
vm.user=data.data;
});

Auth.getmerchant()
.then(function(data){
vm.merchant=data.data;
});
})

$scope.counter = '';
$scope.lat=0;
vm.setallval=function(data){
	console.log(data.lat);
	$window.localStorage.setItem('lat' ,data.lat);
	$window.localStorage.setItem('lng' ,data.lng);

//$scope.lng=(vm.loginData.lng);
//$scope.lat=(vm.loginData.lat);
//alert()
}

vm.getGolu=function(){
alert($window.localStorage.setItem('lat'));
}

$scope.changeloc = function(var1) {
        console.log(var1);
       goyal.location=var1;
      };
$scope.change = function(var1) {
        console.log(var1);
        goyal.category=var1;
      };

vm.getUserdetails=function(){


return goyal;

}

vm.getdetails=function(){


return $window.localStorage.getItem('tokenname');

}

vm.searchresult=function(){

$location.path('/userportal');

}

vm.dologin=function(){
	vm.processing=true;
	vm.error='';

	Auth.login(vm.loginData.username,vm.loginData.password)
.success(function(data){


vm.processing=false;

Auth.getuser()
.then(function(data){
	vm.user=data.data;
goyal.name="dixit";
$window.localStorage.setItem('tokenname' ,data.data.name);
console.log(goyal);
$('#login_modal').modal('toggle');
});

if(data.success)
$location.path('/home');
else
vm.error=data.message;
});
}
vm.dologinmerchant=function(){
	vm.processing=true;
	vm.error='';

	Auth.login(vm.loginDatamerchant.username,vm.loginDatamerchant.password)
.success(function(data){


vm.processing=false;

Auth.getmerchant()
.then(function(data){
	vm.merchant=data.data;
goyal.name="dixit";
$window.localStorage.setItem('tokenname' ,"merchant");
console.log(goyal);
$('#login_modal').modal('toggle');
});

if(data.success)
$location.path('/home');
else
vm.error=data.message;
});
}
vm.dologout=function(){
	Auth.logout();
	$location.path('/logout');
}
});