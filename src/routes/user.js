
const express=require('express')
const User = require('../models/user')
const { userAuth } = require('../middlewares/auth')
const ConnectionRequestModel = require('../models/connectionRequest')

const userRouter=express.Router()


const SAFE_SHOW_DATA=["firstName","lastName","age","skills","about"]



userRouter.get("/user/requests/receive",userAuth,async(req,res)=>{
  try{
    const loggedInUser=req.user
    console.log(loggedInUser);

        const connectionRequest=await ConnectionRequestModel.find({
toUserId:loggedInUser,
status:"interested"
    }).populate("fromUserId",SAFE_SHOW_DATA)
if(!connectionRequest){
    return res.send("kuch to gadbad hai daya")
}


    res.json({
        message:"Data Fetched Succesfully",
        data:connectionRequest
    })
  }catch(e){
    res.status(404).json({message:"There is Some problems"+e.message})
  }

})



userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user
        // console.log(loggedInUser);
        

        const connectionRequest=await ConnectionRequestModel.find({
           $or:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"}
           ]
        }).populate("fromUserId",SAFE_SHOW_DATA).populate("toUserId",SAFE_SHOW_DATA)


        const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===row.toUserId._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        })

        res.json({data})
    }
    catch(e){
    res.status(400).res.send("Error"+e.message)
    }
})


module.exports=userRouter








// userRouter.get("/feed",async(req,res)=>{
//     try{
//         const allusers=await user.find({})
//         res.send(allusers)
//     }
//     catch(e){
//         console.log("Error in fetching Data ")
//         res.status(400).send("Error in fetching Data ")
//     }
// })

// userRouter.get('/user/:id',async(req,res)=>{
//     try{
//         const userById=await user.findById(req.params.id)
//         res.send(userById)
//     }
//     catch{
//         res.status(404).send("User not found")
//     }
// })
// userRouter.delete('/user/:id',async(req,res)=>{
//     try{
//         const userById=await user.findByIdAndDelete(req.params.id)

//        res.send("deleted user")
//     }
//     catch{
//         res.status(404).send("User not found")
//     }
// })

// userRouter.patch("/user/:id",async(req,res)=>{

//     const userId=req.params.id
//     const data=req.body


//     try{
//         const ALLOWED_UPDATES=[
//             "skills","photoURL","about","gender","age"
//         ]
//         const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))
    
//         if(!isUpdateAllowed){
//             // res.status(404).send("Update not Allowed")
//             throw new Error("Update not Allowed")
//         }
//         if(data?.skills.length>10){
//             throw new Error("Skills should not exceed 10")
//         }
//        const updatedUser= await user.findByIdAndUpdate({_id:userId },data,{
//         returnDocument:"before",
//         runValidators:true
//        })
//         res.send("user updated succesfully")
//     }catch(err){
// res.status(404).send("User not found")
//     }
// })
