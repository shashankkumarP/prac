const express = require('express');

const mongoDb = require('mongoose');
const cors = require('cors');
const app = express()
require("dotenv").config();
const port = Number(process.env.PORT);
const MONGODB_URL  = process.env.MONGODB_URL;
const router = require("./routes/bmi")

app.use(express.urlencoded({extended:true}));

app.use(cors())
app.use(express.json())


app.use("/",router);



app.listen(port,async()=>{  
     
    await mongoDb.connect(`${MONGODB_URL}`) 
    
     console.log("server started at port 8080")
})