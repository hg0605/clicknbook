var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ServiceSchema=new Schema({

name:{type:String,required:true},
cost :{type:Number,required:true},
merchantid :{type:String,required:true},
starttime:{type:Number,required:true},
endtime: {type:Number,required:true}

});
ServiceSchema.index({name: 1, merchantid: 1}, {unique: true});
module.exports=mongoose.model('Service',ServiceSchema);