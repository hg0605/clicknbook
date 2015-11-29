

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
})
vm.sendurl=function(var1){
console.log(var1);
$window.location.href=var1;


}

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

vm.map=function(data){
 
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng($window.localStorage.getItem('lat'),$window.localStorage.getItem('lng')),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    
    var marker = new google.maps.Marker({
            position: new google.maps.LatLng($window.localStorage.getItem('lat'),$window.localStorage.getItem('lng')),
        });
        marker.setMap($scope.map);
 
    var request = {
    location: new google.maps.LatLng($window.localStorage.getItem('lat'),$window.localStorage.getItem('lng')),
    radius: '5000',
    types: [data]
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService($scope.map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var marker = new google.maps.Marker({
         // map: map,
          position: place.geometry.location
        });
        marker.setMap($scope.map);
     var d = String(place.geometry.location);
					    d=d.replace('(', '');
					    d=d.replace(')', '');
					    var myarr = d.split(",");
					    var cur_lat=$window.localStorage.getItem('lat');
					    var cur_lng=$window.localStorage.getItem('lng');
						var p1 = new google.maps.LatLng($window.localStorage.getItem('lat'),$window.localStorage.getItem('lng'));
						var p2 = new google.maps.LatLng(myarr[0],myarr[1]);
						//var dis=(google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(4);
						var dis=2;
						var photos = results[i].photos;
						var dixit="hello";
						if (photos) 
						{
							var photo = results[i].photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 });				
						}
						document.getElementById('results').innerHTML+='<div class="container"><div class="row"><div class="col-md-3"></div><div  class="col-md-8" id="results_box"><div class="row"><div class="col-md-3"><img src="'+photo+'" alt="Not availabe" height="100" width="150"><div id="reviews" style="cursor:pointer;" onclick="fuck('+cur_lat+','+cur_lng+','+myarr[0]+','+myarr[1]+');">View on map</div></div><div class="col-md-5"><div id="name"><b>'+results[i].name+'</b></div><table cellpadding="8"  cellspacing="9"><tr><td><i class="fa fa-tags"></i></td><td><div id="category">'+data+'</div></td></tr><tr><td><i class="fa fa-map-marker"></i></td><td><div id="address">Near Noida Fortis Hospital,</div></td></tr><tr><td><i class="fa fa-location-arrow"></i></td><td>'+dis+' km</td></tr><tr><td><i class="fafa-clock-o"></i></td><td>Mon to Sun-10:00 AM to 08:30PM</td></tr></tr></table></div><div class="col-md-4"><h4>BookAppointment</h4><table><tr><td colspan="2"><select style="width:100%;" name="service_name"><option>Option1</option><option>Option2</option><option>Option3</option><option>Option4</option></select></td></tr><tr><td><select style="width:100%;" name="book_date"><option>Date</option><option>Option1</option><option>Option2</option><option>Option3</option><option>Option4</option></select></td><td><select style="float:right;" name="book_time"><option>Time</option><option>Option1</option><option>Option2</option><option>Option3</option><option>Option4</option></select></td></tr><tr><td></td><td><button type="button" style="width:100%;">Book Now</button></td></tr></table></div></div></div><div class="col-md-1"></div></div></div>'; 
      }
    }
  }); 
}
 


vm.up_profile=function(){
$location.path('/profile');
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