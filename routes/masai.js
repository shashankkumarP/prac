const express = require("express");
const app = express();
const router = express.Router();
const masai_model = require("../models/masai_Schema")



router.get("/",(req,res)=>{
    res.send("hello")
})



router.post("/question",async(req,res)=>{
    let {category,difficulty,question,correct,options}= req.body;
    console.log(category,options,difficulty,question)
    if(!category||!difficulty||!question||!correct||!options){
        return res.send({message:"pl. fill the form"}); 
    }

    try{
        let new_question = new masai_model({category:category,difficulty:difficulty,question:question,correct:correct,options:options});
        await new_question.save();
        res.status(201).send({message:"user created"});

    }catch(e){
        res.status(401).send({message:"user not created"});

    }
});

router.post("/user", async(req,res)=>{

    let {category,difficulty,num} = req.body;
    if(!category||!difficulty||!num){
        
        return res.send({message:"pl. fill the form"})
    }
    try{
        let user = await masai_model.find({category:category,difficulty:difficulty}).limit(num);
        console.log(user);
       
        return res.send({message:"user verified",data:user});
        
    }catch(e){
        console.log(e);
        res.send({message:"invalid user"})
    }

})



module.exports = router;