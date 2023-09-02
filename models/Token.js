const mongoose=require("mongoose");
const schema=mongoose.Schema;
const TokenSchema=new Schema({

    userld:{type:Schema.Types.ObjectId,
    required: true,
ref:"user",
unique:true,},
token:{  type: String,
    required: true},
    createAT:  {type: Date,
    default: Date.now(), expires:3600}// 1 hour

})

module.exports=mongoose.model("token", TokenSchema);