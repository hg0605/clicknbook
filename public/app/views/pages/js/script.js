
function clear_cat()
{
	$('.category_data').css({'visibility':'hidden'});
}

function close_cat_data()
{
	$('.category_data ul li').click(function(){
		f=$(this).html();
		document.getElementById('category').value=f;
		
		


		
	});
	setTimeout(clear_cat, 100);
}

function clear_loc()
{
	$('.location_data').css({'visibility':'hidden'});
}

function open_dropdown(g)
{
	//var h=$(g).find("i").attr('class');
	//alert(h);
	var pos=$('.navigation').css('left');
	pos=pos.replace("px", "");
	//alert(pos);
	if(pos>1100)
	{
		$('.navigation').animate({'left':'80%'}, 1000);
		$(g).find("i").attr({'class':'fa fa-times'});
		
	}
	else
	{
		$('.navigation').animate({'left':'100%'}, 1000);
		$(g).find("i").attr({'class':'fa fa-bars'});
		
	}
}

function close_loc_data()
{
	$('.location_data ul li').click(function(){
		f=$(this).html();
		if(f=='Detect my location')
		{
			getLocation();
		}
		else
		{
			document.getElementById('location').value=f;
		}
	});
	setTimeout(clear_loc, 100);
}

function validateCategory()
{
	$('.category_data').css({'visibility':'visible'});
	var cat=document.getElementById('category').value;
	if(cat=='null')
	{
	}
	else
	{
	}
}

function ValidateLocation()
{
	$('.location_data').css({'visibility':'visible'});
	var loc=document.getElementById('location').value;
	
	if(loc=='null')
	{
		
	}
	else
	{
		getLocation();
	}
}

function search_category()
{
	var cat=document.getElementById('category').value;
	var loc=document.getElementById('location').value;
	if(cat=='null' || loc=='null')
	{
		alert('Please enter all fields please');
	}
	else
	{
		if(loc==0)
		{
			var addr=document.getElementById('loc_address').value;
			var lati=document.getElementById('loc_lat').value;
			var longi=document.getElementById('loc_lng').value;
			document.getElementById("search_form").submit();
		}
	}
}


function getLocation() 
{
	if (navigator.geolocation) 
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	} 
}

function showPosition(position) 
{
	var lat=position.coords.latitude;
	var lon=position.coords.longitude;
	name_city(lat,lon);
	document.getElementById('loc_lat').value=lat;
	document.getElementById('loc_lng').value=lon;
}

function name_city(g1,g2)
{
	var geocoder;
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(g1, g2);
	geocoder.geocode
	({
		'latLng': latlng
	}, 
	function(results, status) 
	{
		if (status == google.maps.GeocoderStatus.OK) 
		{
			if (results[0]) 
			{
				var add = String(results[0].formatted_address);
				document.getElementById('loc_address').value = String(add);
				document.getElementById('location').value=String(add);
			}
			else 
			{
				alert("error");
			}
		} 
	});
}

