const jwt=require("jsonwebtoken")
const User=require("../models/user")
const userAuth=async (req,res,next)=>{
// Read the token from the req cookies
try{
const cookies=req.cookies
const {token}=cookies 
if(!token){
    throw new Error("Token is not valid")
}
// Validate the token 

const decodedObj=await jwt.verify(token,"Dev@tinder$56")
const {_id}=decodedObj

const user=await User.findById(_id)
if(!user){
    throw new Error("Not authenticated")
}
req.user=user

next()}
catch(err){
    res.status(401).send("Not authenticated" + err.message)
 
}
// Find the use   r



}


module.exports={
    userAuth
}