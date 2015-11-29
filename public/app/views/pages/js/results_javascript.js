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
						document.getElementById('content1').innerHTML+="<tr><td> "+myarr[0]+"</td><td>"+myarr[1]+"</td><td>"+results[i].name+"</td></tr>";
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
			
			