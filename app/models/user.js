var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var UserSchema=new Schema({

name:{type:String,required:true},
username :{ type:String,required: true,index:{unique:true}},
password :{type:String,required:true,select:false},
address :{type:String,required:true},
location :{type:String,required:true},
email:{type:String,required:true},
latitude: {type:Number,required:true},
longitude: {type:Number,required:true},
contact: {type:String,required:true},
gender: {type:String,required:true}

});

UserSchema.pre('save',function(next){


	var user=this;
	if(user.isModified('password'))return next();
	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err) return next(err);
		user.password=hash;
		next();
	});
});
UserSchema.methods.comparePassword=function(password){
var user=this;
return bcrypt.compareSync(password,user.password);

};
module.exports=mongoose.model('User',UserSchema);