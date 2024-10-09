
const express=require("express")

const authRouter=express.Router()
const User=require('../models/user')
const {validateSignUpData}=require("../utils/validator")
const bcrypt=require("bcrypt")


authRouter.post("/signup",async(req,res)=>{

    // Validation of Data
    
    
    
    
    // Encrypt the passowrd 
    
    
    
    
    
    
        // console.log(req.body);
    // const userObj={
    //     firstName:"Jatin"
    // ,
    // lastName:"Parmar",
    // emailId:"jatin@gmail.com",
    // password:"jatin@123",
    // age:12
    // }
    
    // const done= new User(
      
    // {firstName:"rohit"
    // ,
    // lastName:"thakur",
    // emailId:"rohit@gmail.com",
    // password:"rohit@123",
    // age:15}
    
    // )
    
    // // Creating new instance of user Model
    // const user =new User(userObj)
    
    
    
    try{
        const {password}=req.body
        // Validation of  Data
        validateSignUpData(req)
    
        // Encrypt the passowrd 
        const passwordHash= await bcrypt.hash(password,10)
        // console.log(passwordHash);
    
        const user=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            emailId:req.body.emailId,
            password:passwordHash,
            photoURL:req.body.photoURL
        })
    
        await user.save()
    
    res.send("Done")
    }
    catch(err){
        res.status(400).send("Error in savin Data "+err.message)
    }
    })

 authRouter.post("/login", async(req,res)=>{
        try{
    const {emailId,password}=req.body
    const user=await User.findOne({emailId:emailId})
    if(!user){
        throw new Error("Invalid credentials")
    }
    const isPasswordValid=await user.validatePassword(password)
    if(isPasswordValid){
    
    
    // Create JWT Token  
    // var token = await jwt.sign({ _id: user._id }, "Dev@tinder$56",{ expiresIn: '1h' });
    const token=await user.getJWT() 
    
    console.log(token);
    // Add token to cookie and send the response back ti user
    
    
    res.cookie("token",token,{
        expires: new Date(Date.now() + 900000)
    } )
    
    // console.log(token)
    
       res.send("Login SuccessFul") 
    }else{
        throw new Error("Invalid credentials") 
    }
        }catch(err){
    res.status(400).send("Error : "+err.message)
        }
    })




authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    }).send("Logout successful")
})
 


module.exports=authRouter