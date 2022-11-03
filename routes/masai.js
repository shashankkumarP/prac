const express = require("express");
const app = express();
const router = express.Router();
const masai_model = require("../models/masai_Schema")



router.get("/",(req,res)=>{
    res.send("hello")
})



router.post("/signup",async(req,res)=>{
    let {name,email,password}= req.body;
    if(!name||!email||!password){
        return res.send({message:"pl. fill the form"}); 
    }

    try{
        let new_user = new masai_model({name:name,email:email,password:password});
        await new_user.save();
        res.status(201).send({message:"user created",data:{name:name,email:email,password:password}});

    }catch(e){
        res.status(401).send({message:"user not created"});

    }
});

router.post("/login",async(req,res)=>{

    let {email,password} = req.body;
    if(!email||!password){
        return res.send({message:"pl. fill the form"})
    }
    try{
        let user = await masai_model.findOne({email:email});
        console.log(user);
        if((user.email==email)&&(user.password==password)){
            return res.send({message:"user verified",data:user});
        }else{
            return res.send({message:"password not matched"}); 
        }
    }catch(e){
        console.log(e);
        res.send({message:"invalid user"})
    }

})

router.post("/create",async(req,res)=>{
    let {email, message} = req.body;
    message.datatime = Date.now();
    console.log(message,email)
    
   

    try{
        let user= await masai_model.updateOne({email:email},  { $push: { tickets: message } })
        console.log("ok")
        res.status(201).send({message:"bmi added successfully",tickets:message})
    }catch(e){
        res.send({message:"user not found"})
    }
});

router.post("/history",async(req,res)=>{
    let {email} = req.body;
    console.log("email",email)
    try{
        let data = await masai_model.findOne({email:email});
        res.status(200).send({message:"found user",data:data.tickets})

    }catch(e){
        res.send({message:"user not found"})

    }
})


module.exports = router;