
const express=require('express')

const userRouter=express.Router()



userRouter.get("/feed",async(req,res)=>{
    try{
        const allusers=await user.find({})
        res.send(allusers)
    }
    catch(e){
        console.log("Error in fetching Data ")
        res.status(400).send("Error in fetching Data ")
    }
})



userRouter.get("/feed",async(req,res)=>{
    try{
        const allusers=await user.find({})
        res.send(allusers)
    }
    catch(e){
        console.log("Error in fetching Data ")
        res.status(400).send("Error in fetching Data ")
    }
})

userRouter.get('/user/:id',async(req,res)=>{
    try{
        const userById=await user.findById(req.params.id)
        res.send(userById)
    }
    catch{
        res.status(404).send("User not found")
    }
})
userRouter.delete('/user/:id',async(req,res)=>{
    try{
        const userById=await user.findByIdAndDelete(req.params.id)

       res.send("deleted user")
    }
    catch{
        res.status(404).send("User not found")
    }
})

userRouter.patch("/user/:id",async(req,res)=>{

    const userId=req.params.id
    const data=req.body


    try{
        const ALLOWED_UPDATES=[
            "skills","photoURL","about","gender","age"
        ]
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))
    
        if(!isUpdateAllowed){
            // res.status(404).send("Update not Allowed")
            throw new Error("Update not Allowed")
        }
        if(data?.skills.length>10){
            throw new Error("Skills should not exceed 10")
        }
       const updatedUser= await user.findByIdAndUpdate({_id:userId },data,{
        returnDocument:"before",
        runValidators:true
       })
        res.send("user updated succesfully")
    }catch(err){
res.status(404).send("User not found")
    }
})


module.exports=userRouter