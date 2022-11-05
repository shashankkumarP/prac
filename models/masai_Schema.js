const {Schema,model} = require("mongoose");


const masai_schema = new Schema({
    category:{type:String,required:true},
    difficulty:{type:String,required:true},
    question:{type:String,required:true,unique:true},
    correct:{type:String,requied:true},
    options:[]

},{
    strict:false
},
{
    versionKey:false
})


const masai_model = model("masaiquiz",masai_schema)
module.exports=masai_model