var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bid=new Schema({

bid :{type:Number,required:true},


});

module.exports=mongoose.model('Bid',bid);
