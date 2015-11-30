var User=require('../models/user');
var Merchant=require('../models/merchant');
var Service=require('../models/service');
var Booking=require('../models/booking');
var Story=require('../models/story');
var Bid=require('../models/bid');
var config=require('../../config');
var secretkey= config.secretKey;
var jsonwebtoken =require('jsonwebtoken');
var bcrypt=require('bcrypt-nodejs');
var https=require('https');

function createToken(user){

var token=jsonwebtoken.sign({
	id:user._id,
	name: user.name,
	username: user.username
},secretkey,{
	expiresInMinutes:1440
});

return token;
}
function createTokenMerchant(user){

var token=jsonwebtoken.sign({
	id:user._id,
	name: user.name,
	username: user.username
},secretkey,{
	expiresInMinutes:1440
});

return token;
}
module.exports=function(app,express){

var api= express.Router();

api.post('/signup',function(req,res){

var user=new User({
name: req.body.name,
username:req.body.username,
password: bcrypt.hashSync(req.body.password),
address: req.body.address,
location: req.body.location,
latitude: req.body.latitude,
longitude: req.body.longitude,
contact: req.body.contact,
email: req.body.email,
gender: req.body.gender
});
var token=createToken(user);
user.save(function(err){

	if(err)
	{
		res.send(err);
		return;
	}
	res.json({
		success:true,
		message : 'User has been created!',
		token:token
	});
});

});
api.post('/addservice',function(req,res){

var service=new Service({
name: req.body.name,

cost: req.body.cost,
merchantid: req.body.merchantid,
starttime: req.body.starttime,
endtime: req.body.endtime

});

service.save(function(err){

	if(err)
	{
		res.send(err);
		return;
	}
	res.json({
		success:true,
		message : 'Service has been created!',
		
	});
});

});
api.post('/addbid',function(req,res){

var bid=new Bid({
bid: req.body.bid,


});

bid.save(function(err){

	if(err)
	{
		res.send(err);
		return;
	}
	res.json({
		success:true,
		message : 'Bid has been created!',
		
	});
});

});
api.post('/addbooking',function(req,res){


Bid.findOne({},function(err,booking){

if(err)
{

	res.send(err);
	return; 
}

var bookid=booking.bid;
var now=new Date(req.body.bookingdate);
console.log(now);
var date = now.toUTCString();
console.log(date);
var bombay=date+(360000*5.5);
var date1=new Date(bombay);
console.log(date1);
var booking=new Booking({
paycode: req.body.paycode,
merchantid: req.body.merchantid,
customerid: req.body.customerid,
serviceid: req.body.serviceid,
bookingid: bookid,
starttime: req.body.starttime,
endtime: req.body.endtime,
bookingdate:date,
appointment:req.body.appointment,
address:req.body.address,
cost:req.body.cost

});

booking.save(function(err){

	if(err)
	{
		res.send(err);
		return;
	}
	res.json({
		success:true,
		message : 'Booking has been created!',
		
	});
	bookid=bookid+1;
	Bid.findOne({},function(err,doc){

if(!err && doc)
{
doc.bid=bookid;
console.log(doc);
doc.save(function(err) {
          if(err) {
            res.json(500, {message: "Could not update Bid. " +
err});
}


})

}
});
});
});
});
api.get('/services',function(req,res)
{
Service.find({},function(err,service){

if(err)
{

	res.send(err);
	return; 
}

res.json(service);
});


});
api.get('/bid',function(req,res)
{
bid.find({},function(err,bookid){

if(err)
{

	res.send(err);
	return; 
}

res.json(bookid);
});


});

api.get('/booking',function(req,res)
{
Booking.find({},function(err,booking){

if(err)
{

	res.send(err);
	return; 
}


res.json(booking);
});


});
api.post('/bookingmerchant',function(req,res)
{
Booking.find({merchantid:req.body.merchantid},function(err,booking){

if(err)
{

	res.send(err);
	return; 
}

res.json(booking);
});


});
api.post('/bookingcustomer',function(req,res)
{
Booking.find({customerid:req.body.customerid},function(err,booking){

if(err)
{

	res.send(err);
	return; 
}

res.json(booking);
});

});
api.post('/servicemerchant',function(req,res)
{
Service.find({merchantid:req.body.merchantid},function(err,service){

if(err)
{

	res.send(err);
	return; 
}

res.json(service);
});


});
api.post('/servicebyid',function(req,res)
{
Service.findById(req.body.serviceid,function(err,service){

if(err)
{

	res.send(err);
	return; 
}

res.json(service);
});


});
api.post('/customerbyid',function(req,res)
{
User.findById(req.body.id,function(err,user){

if(err)
{

	res.send(err);
	return; 
}

res.json(user);
});


});
api.post('/signupmerchant',function(req,res){

var merchant=new Merchant({
name: req.body.name,
username:req.body.username,
password: bcrypt.hashSync(req.body.password),
address: req.body.address,
latitude: req.body.latitude,
longitude: req.body.longitude,
placename: req.body.placename,
email: req.body.email,
gender: req.body.gender,
wallet:0

});
merchant.save(function(err){

	if(err)
	{
		

		res.send(err);

		return;
	}
	res.json({message : 'Merchant has been created!'});
});

});
api.get('/users',function(req,res)
{
User.find({},function(err,users){

if(err)
{

	res.send(err);
	return; 
}

res.json(users);
});


});
api.get('/fetchmerchants',function(req,res)
{
Merchant.find({},function(err,merchants){

if(err)
{

	res.send(err);
	return; 
}

res.json(merchants);
});


});
api.post('/updateservice',function(req,res){
if(req.body.id){
Service.findById(req.body.id,function(err,doc){

if(!err && doc)
{
doc.name=req.body.name;

doc.cost=req.body.cost;
doc.merchantid= req.body.merchantid;
doc.starttime= req.body.starttime;
doc.endtime= req.body.endtime;
doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Service updated: " +
req.body.name});
          } else {
            res.json(500, {message: "Could not update Service. " +
err});
}


})

}
else {
        res.json(500, { message: "Could not update Service. " +
err});
    }
});
}
else
{
	    res.json(500, { message: "ID is invalid. " });
}
});
api.post('/updatebookingstatus',function(req,res){
if(req.body.id){
Booking.findById(req.body.id,function(err,doc){

if(!err && doc)
{
doc.appointment=req.body.status;
doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "status updated: " +
req.body.status});
          } else {
            res.json(500, {message: "Could not update status. " +
err});
}


})

}
else {
        res.json(500, { message: "Could not update status. " +
err});
    }
});
}
else
{
	    res.json(500, { message: "ID is invalid. " });
}
});
api.post('/updateusers',function(req,res){
User.findById(req.body.id,function(err,doc){

if(!err && doc)
{
doc.name=req.body.name;
doc.username=req.body.username;
doc.password=bcrypt.hashSync(req.body.password);
doc.address=req.body.address;
doc.latitude=req.body.latitude;
doc.longitude= req.body.longitude;
doc.location= req.body.location;
doc.email=req.body.email;
doc.contact=req.body.contact;
doc.gender= req.body.gender;
doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "User updated: " +
req.body.name});
          } else {
            res.json(500, {message: "Could not update user. " +
err});
}


})

}
else {
        res.json(500, { message: "Could not update User. " +
err});
    }
});
});
api.post('/updatemerchants',function(req,res){
User.findById(req.body.id,function(err,doc){

if(!err && doc)
{
doc.name=req.body.name;
doc.username=req.body.username;
doc.password=bcrypt.hashSync(req.body.password);
doc.address=req.body.address;
doc.latitude=req.body.latitude;
doc.longitude= req.body.longitude;
doc.placename= req.body.placename;
doc.email=req.body.email;
doc.gender= req.body.gender;
doc.save(function(err) {
          if(!err) {
            res.json(200, {message: "Merchant updated: " +
req.body.name});
          } else {
            res.json(500, {message: "Could not update Merchant. " +
err});
}


})

}
else {
        res.json(500, { message: "Could not update Merchant. " +
err});
    }
});
});

api.post('/deleteuser',function(req, res) {
      
  var id = req.body.id;
  if(id){
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      console.log(doc);
      doc.remove();
      res.json(200, { message: "User removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find user."});
    } else {
      res.json(403, {message: "Could not delete User. " + err});
    }
  });
}
else
{
	res.json(403, {message: "Could not delete User. "});
}
});
api.post('/deleteservice',function(req, res) {
      
  var id = req.body.id;
  console.log(id);
 if(id){
  Service.findById(id, function(err, doc) {
    if(!err && doc) {
      console.log(doc.id);
      doc.remove();
      res.json(200, { message: "Service removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find service."});
    } else {
      res.json(403, {message: "Could not delete Service. " + err});
    }
  });
}
else
{
	res.json(403, {message: "Could not delete Service. " });
}
});
api.post('/deletemerchants',function(req, res) {
      
  var id = req.body.id;
 if(id){
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Merchant removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find Merchant."});
    } else {
      res.json(403, {message: "Could not delete Merchant. " + err});
    }
  });
}
else
{
	res.json(403, {message: "Could not delete Merchant. "});
}
});

api.post('/usemap',function(req,res){

var latitude=req.body.latitude;
var longitude=req.body.longitude;
var https=require('https');

var url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+latitude+","+longitude+"&radius=500&types=food&key=AIzaSyApjzh7tQbi5qeTnJxZ1HkxMF1qqcKnEbA"
console.log(url);
https.get(url,function(response){
var body='';
response.on('data',function(chunk){
	body+=chunk;
});
response.on('end',function(){
	var places=JSON.parse(body);
	var locations=places.results;
	res.json(locations);
});
});
});

api.post('/paycode',function(req,res){

Booking.findOne({

	_id:req.body.bookingid
}).select('paycode').exec(function(err,book){

if(err) throw err;
else if(book){
	if(req.body.paycode==book.paycode){
res.json({
				paycode:true,
				message:"Paycode validated",
				
			});	


	}
	else{
res.json({
				paycode:false,
				message:"Paycode NOT validated",
				
			});

	}

}


});



});
api.post('/login',function(req,res){

User.findOne({

	username: req.body.username
}).select('name username password').exec(function(err,user){


	if(err) throw err;

	if(!user){

		res.send({message: "User doesn't exist"});
	}
	else if(user)
	{
		
		var validPassword=bcrypt.compareSync(req.body.password,user.password);

		if(!validPassword){
			res.send({message:"Invalid Password"});
		} 
		else{
			var token=createToken(user);
			res.json({
				success:true,
				message:"Successfully Log In",
				token:token 
			});


		}
	
	}
	

	
		


});

});

api.post('/loginmerchant',function(req,res){

Merchant.findOne({

	username: req.body.username
}).select('name username password').exec(function(err,user){


	if(err) throw err;

	if(!user){

		res.send({message: "Merchant doesn't exist"});
	}
	else if(user)
	{
		
		var validPassword=bcrypt.compareSync(req.body.password,user.password);

		if(!validPassword){
			res.send({message:"Invalid Password"});
		} 
		else{
			var token=createTokenMerchant(user);
			res.json({
				success:true,
				message:"Successfully Logged In Merchant",
				mertoken:token 
			});


		}
	
	}
	

	
		


});

});

 api.use(function(req,res,next){

console.log("Somebody just came to our app");
var token=req.body.token || req.param('token') || req.headers['x-access-token'];
var mertoken=req.body.mertoken || req.param('mertoken') || req.headers['x-access-mertoken'];
if(token){
	jsonwebtoken.verify(token,secretkey,function(err,decoded){

		if(err){
			res.status(403).send({success:false,message:"Failed to authenticate user"});

		}
		else
		{
			req.decoded=decoded;
		next();
		}

	});

}
else if(mertoken){
	jsonwebtoken.verify(mertoken,secretkey,function(err,decoded){

		if(err){
			res.status(403).send({success:false,message:"Failed to authenticate merchant"});

		}
		else
		{
			req.decoded=decoded;
		next();
		}

	});

}
else
{
	res.status(403).send({success:false,message:"No TOken Provided"});
}

 });

api.route('/')

.post(function(req,res){

var story=new Story({
creator: req.decoded.id,
content: req.body.content,


});
story.save(function(err){

	if(err)
	{
		res.send(err);
		return
	}
	res.json({ message:"New Story Created !!"});
});
})

.get(function(req,res){

Story.find({creator:req.decoded.id},function(err,stories){

	if(err){
		res.send(err);
		return;

	}
	res.json(stories);
});

});

api.get('/me',function(req,res){

res.json(req.decoded);

});



return api;
}