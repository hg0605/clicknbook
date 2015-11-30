var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var BookingSchema=new Schema({


merchantid :{type:String,required:true},
serviceid :{type:String,required:true},
bookingid :{type:Number,required:true},
customerid :{type:String,required:true},
paycode :{type:String,required:true},
appointment :{type:String,required:true},
starttime:{type:Number,required:true},
endtime: {type:Number,required:true},
bookingdate :{type:Date,required:true},
address:{type:String,required:true},
cost:{type:Number,required:true}

});
BookingSchema.index({bookingid: 1, merchantid: 1}, {unique: true});
module.exports=mongoose.model('Booking',BookingSchema);