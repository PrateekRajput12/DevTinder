const express=require("express");
const connectDB= require('./config/database')
const app=express()

const User=require('./models/user')
app.post("/signup",async(req,res)=>{
const userObj={
    firstName:"Jatin"
,
lastName:"Parmar",
emailId:"jatin@gmail.com",
password:"jatin@123",
age:12
}

const done= new User(
  
{firstName:"rohit"
,
lastName:"thakur",
emailId:"rohit@gmail.com",
password:"rohit@123",
age:15}

)

// Creating new instance of user Model
const user =new User(userObj)

try{
    await done.save()

res.send("Done")
}
catch(err){
    res.status(400).send("Error in savin Data "+err.message)
}
})


connectDB().then(()=>{
    console.log("DB COnnection established");
    app.listen(7070,()=>{
        console.log("Server started on port 7070");
    })
})
.catch((err)=>{
    console.error("Error connecting to DB",err);
})
