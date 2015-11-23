<?php
	$cat = $_POST['category'];
	$lat = $_POST['loc_lat'];
	$longi = $_POST['loc_lng'];
	$adr = $_POST['location'];
	
	if($cat=='Electrician')
	{
		$f="electrician";
	}
	else if ($cat=='Plumber')
	{
		$f="plumber";
	}
	else if($cat=='Car Repair')
	{
		$f="car_repair";
	}
?>

<html>
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<title>Jaypee Fix</title>
		<link rel="stylesheet" href="css/style.css" type="text/css"/>
		<link rel="stylesheet" href="css/bootstrap.css" type="text/css"/>
		<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"/>
		<link rel="stylesheet" href="css/bootstrap-theme.css" type="text/css"/>
		<link rel="stylesheet" href="css/bootstrap-theme.min.css" type="text/css"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		<style>
			#map 
			{
			display:none;
			}
		</style>
		<script>
			var map;
			var infowindow;
			var cr;
			function initMap() 
			{
				var pyrmont = {lat: <?php echo $lat; ?>, lng: <?php echo $longi; ?>};
				cr=pyrmont;
				var myCenter=new google.maps.LatLng(<?php echo $lat; ?>,<?php echo $longi; ?>);
				map = new google.maps.Map(document.getElementById('map'), {
					center: pyrmont,
					zoom: 15
				});
				
				infowindow = new google.maps.InfoWindow();
				
				var marker=new google.maps.Marker({
					position:myCenter,
					icon:'images/marker.png',
					animation:google.maps.Animation.BOUNCE
				});
				
				marker.setMap(map);
				
				var service = new google.maps.places.PlacesService(map);
				service.nearbySearch({
					location: pyrmont,
					radius: 5000,
					types: ['<?php echo $f; ?>']
				}, callback);
				
			}
			
			function callback(results, status) 
			{
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					for (var i = 0; i < results.length; i++) {
						createMarker(results[i]);
						var d = String(results[i].geometry.location);
					    d=d.replace('(', '');
					    d=d.replace(')', '');
					    var myarr = d.split(",");
						var p1 = new google.maps.LatLng(<?php echo $lat;?>,<?php echo $longi;?>);
						var p2 = new google.maps.LatLng(myarr[0],myarr[1]);
						var dis=calcDistance(p1,p2);
						var photos = results[i].photos;
						if (photos) 
						{
							var photo = results[i].photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 });				
						}
						document.getElementById('results').innerHTML+='<div class="container"><div class="row"><div class="col-md-1"></div><div class="col-md-2"></div><div  class="col-md-8" id="results_box"><div class="row"><div class="col-md-3"><img src="'+photo+'" alt="Not availabe" height="100" width="150"><div id="reviews">REVIEW</div></div><div class="col-md-5"><div id="name"><b>'+results[i].name+'</b></div><table cellpadding="8"  cellspacing="9"><tr><td><i class="fa fa-tags"></i></td><td><div id="category">Electrician</div></td></tr><tr><td><i class="fa fa-map-marker"></i></td><td><div id="address">Near Noida Fortis Hospital,</div></td></tr><tr><td><i class="fa fa-location-arrow"></i></td><td>'+dis+' km</td></tr><tr><td><i class="fafa-clock-o"></i></td><td>Mon to Sun-10:00 AM to 08:30PM</td></tr></tr></table></div><div class="col-md-4"><h4>BookAppointment</h4><table><tr><td colspan="2"><select style="width:100%;" name="service_name"><option>Option1</option><option>Option2</option><option>Option3</option><option>Option4</option></select></td></tr><tr><td><select style="width:100%;" name="book_date"><option>Date</option><option>Option1</option><option>Option2</option><option>Option3</option><option>Option4</option></select></td><td><select style="float:right;" name="book_time"><option>Time</option><option>Option1</option><option>Option2</option><option>Option3</option><option>Option4</option></select></td></tr><tr><td></td><td><button type="button" style="width:100%;">Book Now</button></td></tr></table></div></div></div><div class="col-md-1"></div></div></div>';
					}
				}
			}
			
			function calcDistance(p1, p2)
			{
				return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(4);
			}
			
			function createMarker(place) 
			{
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location
				});
				google.maps.event.addListener(marker, 'click', function() {
					var p1 = new google.maps.LatLng(<?php echo $lat;?>,<?php echo $longi;?>);
					var placeLoc1 = String(place.geometry.location);
					
					placeLoc1 = placeLoc1.replace('(','');
					placeLoc1 = placeLoc1.replace(')', '');
					var myarr = placeLoc1.split(',');
					var p2 = new google.maps.LatLng(myarr[0],myarr[1]);
					document.getElementById('places').innerHTML=calcDistance(p1,p2)+'km';
					displayRoute(myarr[0],myarr[1]);
					//alert(calcDistance(p1,p2));
					document.getElementById('places').innerHTML=calcDistance(p1,p2)+'km';
					var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
					directionsDisplay.setMap(map);
				});
			}
			function displayRoute(g1,g2) 
			{
				
				var start = new google.maps.LatLng(<?php echo $lat;?>,<?php echo $longi;?>);
				var end = new google.maps.LatLng(g1,g2);
				
				var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
				directionsDisplay.setMap(map); // map should be already initialized.
				
				var request = {
					origin : start,
					destination : end,
					travelMode : google.maps.TravelMode.DRIVING
				};
				var directionsService = new google.maps.DirectionsService(); 
				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
					}
				});
			}
			
			function name_city (g1,g2)
			{
				var geocoder;
				geocoder = new google.maps.Geocoder();
				var latlng = new google.maps.LatLng(g1, g2);
				geocoder.geocode({
					'latLng': latlng
				}, function(results, status) 
				{
					if (status == google.maps.GeocoderStatus.OK) 
					{
						if (results[0]) 
						{
							var add = results[0].formatted_address;
							return Stirng(add);
						}
						else 
						{
							alert("error");
						}
					} 
				});
			}
			
		</script>
	</head>
	<body>
		<?php include 'header.php'; ?>
		<section id="results"></section>
		<div id="map"></div>
		<?php include 'footer.php'; ?>
		<script src="js/results_javascript.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/npm.js"></script>
		<script src="js/script.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
		<script src="js/angular_mainscript.js"></script> 
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<script>
			$(window).resize(function() {
				if($('#toggle_button').css('display')=='block')
				{
					$('.navbar-header').css({'margin-right':'0%'});
					$('.navbar-right li').css({'margin-right':'0%'});		
					$('.navbar-right').css({'width':''});
				}
				else
				{
					$('.navbar-header').css({'margin-right':'7%'});
					$('.navbar-right li').css({'margin-right':'5%'});		
					$('.navbar-right').css({'width':'20%'});
				}
			});
		</script>
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&libraries=geometry"></script>
		<script src="https://maps.googleapis.com/maps/api/js?signed_in=true&libraries=places&callback=initMap" async defer></script>
	</body>
</html>					