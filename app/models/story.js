var mongoose=require('mongoose');
var schema=mongoose.Schema;

var StorySchema=new schema({

creator :{ type:schema.Types.ObjectId,ref:'User'},
content:String,
created:{ type: Date,default: Date.now}

});

module.exports=mongoose.model('Story',StorySchema);
