var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var MerchantSchema=new Schema({

name:String,
username :{ type:String,required: true,index:{unique:true}},
password :{type:String,required:true,select:false},
address :{type:String,required:true},
latitude: {type:String,required:true},
longitude: {type:String,required:true},
placename: {type:String,required:true},
email:{type:String,required:true},
gender:{type:String,required:true},
wallet:{type:Number,required:true}
});
MerchantSchema.pre('save',function(next){


	var user=this;
	if(user.isModified('password'))return next();
	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err) return next(err);
		user.password=hash;
		next();
	});
});
MerchantSchema.methods.comparePassword=function(password){
var user=this;
return bcrypt.compareSync(password,user.password);

};
module.exports=mongoose.model('Merchant',MerchantSchema);