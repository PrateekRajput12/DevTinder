const express=require("express")

const requestRouters=express.Router()

const connectionRequestModel=require("../models/connectionRequest")
const {userAuth}=require("../middlewares/auth")

requestRouters.post("/request/review/:status/:toUserId",userAuth,async (req,res)=>{
    try{
const fromUserId=req.user._id
const toUserId=req.params.toUserId
const status=req.params.status

const toUser=await User.findById(toUserId)
if(!toUser){
    return res.status(404).json({message:"User not found"})
}
const allowedStatus=["ignored","interested"];
if(!allowedStatus.includes(status``)){
    return res.status(400).json({message:"Invalid status type :"+status})
}
const connectionRequest=new connectionRequestModel({
    fromUserId,
    toUserId,
    status
})

const existingConnectionReques=await connectionRequest.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
    ]
})
if(existingConnectionReques){
    return res.status(400).send(" User already exists")
}


const data=await connectionRequest.save()

res.json({
    message:"Connection Request Send Succesfully",
    data,
})
    }
    catch(e){
res.status(400).send("ERROR: "+e.message)
    }
})