const {Schema,model} = require("mongoose");


const masai_schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,requied:true},
    tickets:[]

},{
    strict:false
},
{
    versionKey:false
})




const masai_model = model("masai",masai_schema)
module.exports=masai_model