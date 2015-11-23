var User=require('../models/user');
var config=require('../../config');
var secretkey= config.secretkey;
var jsonwebtoken =require('jsonwebtoken');
var bcrypt=require('bcrypt-nodejs');
function createToken(user){

var token=jsonwebtoken.sign({
	_id:user._id,
	name: user.name,
	username: user.username

},secretkey,{
	expirtesInMinute:1440
});

return token;
}
module.exports=function(app,express){

var api= express.Router();
api.post('/signup',function(req,res){

var user=new User({
name: req.body.name,
username:req.body.username,
password: req.body.password


});
user.save(function(err){

	if(err)
	{

		res.send(err);

		return;
	}
	res.json({message : 'User has been created!'});
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
api.post('/login',function(req,res){

User.findOne({

	username: req.body.username
}).select('password').exec(function(err,user){


	if(err) throw err;

	if(!user){

		res.send({message: "User doesn't exist"});
	}
	else if(user){
		console.log(user.password);
		
		var validPassword=bcrypt.compareSync(req.body.password,user.password);

		if(!validPassword){
			res.send({message:"Invalid Password"});
		} else{
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
return api;
}