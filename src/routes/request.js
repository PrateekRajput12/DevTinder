const express=require("express")

const requestRouters=express.Router()

const connectionRequestModel=require("../models/connectionRequest")
const {userAuth}=require("../middlewares/auth")

requestRouters.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
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


requestRouters.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{

        const {requestId,status}=req.params
        const loggedInUser=req.user

        const allowedStatus=["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:`your status is ${status} which is not allowed`})
        }

const connectionRequest=new connectionRequestModel({
    _id:requestId,
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

    }
    catch(e){
        res.status(400).json({
            message:`Error :${e.message}`,
          
        })
    }
}
)