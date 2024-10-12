const express=require("express")

const requestRouters=express.Router()

const ConnectionRequestModel=require("../models/connectionRequest")
const {userAuth}=require("../middlewares/auth")
const User=require('../models/user')
requestRouters.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
const fromUserId=req.user._id
// console.log(fromUserId);
const toUserId=req.params.toUserId
// console.log(toUserId);
const status=req.params.status
// console.log(status);

const allowedStatus=["ignored","interested"];
if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"Invalid status type :"+status})
}
const toUser=await User.findById(toUserId)

if(!toUser){
    return res.status(404).json({message:"User not foundddddddddddddddddd"})
}

const existingConnectionReques=await ConnectionRequestModel.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
    ],
})
if(existingConnectionReques){
    return res.status(400).send(" User already exists")
}


const connectionRequest=new ConnectionRequestModel({
    fromUserId,
    toUserId,
    status
})
console.log(connectionRequest+"yr hai");
const data=await connectionRequest.save()

res.json({
    message:"Connection Request Send Succesfully",
    data,
})
    }
    catch(e){
res.send("ERROR: aye hain "+e.message)
    }
})


requestRouters.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{

        // const {requestId,status}=req.params
        const requestId=req.params.requestId
        const status=req.params.status
        const loggedInUser=req.user

        const allowedStatus=["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:`your status is ${status} which is not allowed`})
        }

const connectionRequest=await ConnectionRequestModel.findOne({
    fromUserId:requestId,
 toUserId:loggedInUser._id,
 status:"interested"
})
if(!connectionRequest){
    return res.status(404).json({
        message:"Connection Request Not Found"
    })
}

connectionRequest.status=status
const data=await connectionRequest.save()

  res.json({ message: "Connection request " + status, data });    }
    catch(e){
        res.status(400).json({
            message:`Error :${e.message}`
          
        })
    }
}
)

module.exports=requestRouters