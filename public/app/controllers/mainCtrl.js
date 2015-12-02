angular.module('mainCtrl',[])

.controller('MainController',function($rootScope,$location,Auth,goyal,$scope,$window,dataservice){

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
$scope.fetchservice=[];
$scope.serv=[];
$scope.viewservice=function(){
  var lat=$window.localStorage.getItem("lat");
  var lng=$window.localStorage.getItem("lng");
$scope.message="";
dataservice.servicenearbuy(lat,lng)
.then(function(response){

 console.log("lat"+lat); 
//console.log(response.data);
$scope.serv=response.data;
console.log($scope.serv);

var i=0;

  //$scope.message=response.data.message;
  
});


}
$scope.bookappointment=function(service){

    var result = '';
    var length=6;
    var chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
   console.log(result);

console.log($('#booktime').val());
btime=$('#booktime').val();
dataservice.createbooking(service,btime)
.then(function(response){

if(response.success)
{
 console.log("successful booking"); 
}

})


}
$scope.timelist=[];
$scope.servbookingdata=function(id,starttime,endtime){
console.log("HArsh"+id);
dataservice.servicebookingtime(id)
.then(function(response){

$scope.timedata=response.data;
var index=0,t=0;
for(var a=starttime;a<endtime;a++)
{t=0;
  for(var b=0;b<$scope.timedata.length;b++)
  {
    if($scope.timedata[b].starttime==a && $scope.timedata[b].appointment=="Accepted")
    {
      t=1;
      break;
    }
  }
if(t==0)
{
  $scope.timelist[index]=a;
  index++;
}
}
console.log($scope.timelist);

});



}
vm.setallval=function(data){
	console.log(data.lat);
	$window.localStorage.setItem('lat' ,data.lat);
	$window.localStorage.setItem('lng' ,data.lng);
}

vm.auto_complete=function()
{
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 20
        });
        var input = /** @type {!HTMLInputElement} */(
          document.getElementById('pac-input'));
          
           google.maps.event.trigger(map, 'resize');
          var types = document.getElementById('type-selector');
          //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
          //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
          
          var autocomplete = new google.maps.places.Autocomplete(input);
          autocomplete.bindTo('bounds', map);
          
          var infowindow = new google.maps.InfoWindow();
          var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
          });
          
          autocomplete.addListener('place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
          //  alert('dixit');
            var place = autocomplete.getPlace();
            if (!place.geometry) {
              window.alert("Autocomplete's returned place contains no geometry");
              return;
            }
            
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
              var placeLoc1 = String(place.geometry.location);
          
               placeLoc1 = placeLoc1.replace('(','');
               placeLoc1 = placeLoc1.replace(')', '');
               var myarr = placeLoc1.split(',');
          
              var e = document.getElementById("loc_lat1");
              e.value = myarr[0];
              var $e = angular.element(e);
              $e.triggerHandler('input');

                        var e = document.getElementById("loc_lng1");
              e.value = myarr[1];
              var $e = angular.element(e);
              $e.triggerHandler('input');
    
                          var e = document.getElementById("pac-input");
              var $e = angular.element(e);
              $e.triggerHandler('input');
  
              } else {
              
            map.setCenter(place.geometry.location);
              map.setZoom(15);  // Why 17? Because it looks good.
            }
            marker.setIcon(/** @type {google.maps.Icon} */({
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            
            var address = '';
            if (place.address_components) {
              address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
              ].join(' ');
            }
            
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            infowindow.open(map, marker);
            });


  
}




vm.map=function(data){
 
  
    
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng($window.localStorage.getItem('lat'),$window.localStorage.getItem('lng')),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
     var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap($scope.map);

    var marker = new google.maps.Marker ({
        position: new google.maps.LatLng($window.localStorage.getItem('lat'),$window.localStorage.getItem('lng')),
        icon: 'app/views/images/marker.png'
        });
   var cur_lat= $window.localStorage.getItem('lat');
   var cur_lng= $window.localStorage.getItem('lng');

   var cur = new google.maps.LatLng(cur_lat,cur_lng);
  var myCenter=new google.maps.LatLng(28.66,77.05);
      
   marker.setAnimation(google.maps.Animation.BOUNCE);
        marker.setMap($scope.map);

      var request = {
      origin:new google.maps.LatLng(28.66,77.05),
      destination:new google.maps.LatLng(41.85,-87.65),
      travelMode: google.maps.TravelMode.DRIVING
      };

    directionsService.route(request, function(response, status) {
//    alert(status);
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
 //     window.alert('Directions request failed due to ' + status);
    }
  });

  
    var request = {
    location: new google.maps.LatLng($window.localStorage.getItem('lat'),$window.localStorage.getItem('lng')),
    radius: '5000',
    types: [data]
  };
 var infowindow = new google.maps.InfoWindow();
  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService($scope.map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
  
        var place = results[i];
  
        var marker = new google.maps.Marker({
          position: place.geometry.location
        });
    
       google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br></div>');
        infowindow.open($scope.map, this);
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

vm.map_view=function(){
$location.path('/map_view');
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