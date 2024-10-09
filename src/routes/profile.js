const express=require("express")
const profileRouter=express()
const {userAuth}=require("../middlewares/auth")

profileRouter.get("/profile",userAuth,async (req,res)=>{
  
    try{  
   //      const cookies=req.cookies;
   //     console.log(cookies);
   //     const {token}=cookies
   //     if(!token){
   //         throw new Error("Please Login Again")
   //     }
   //  const decodedMsg= jwt.verify(token, 'Dev@tinder$56');
   // const {_id}=decodedMsg
   // console.log("Logged in user : "+ _id);
   
   // const user=await User.findById(_id);
   const user=req.user
   if(!user){ throw new Error("User not found")}
       res.send(user)
   }catch(e){
   res.status(404).send("User not found" + e.message)
   }
   })
   

   profileRouter.get("/user",async(req,res)=>{
    //   const data =connectDB.collecyion("test").
    try{
        const data =  await User.findOne({emailId:req.body.emailId})
        if(data.length===0){
            res.status(400).send("User not found")
    
        }
        else{
            console.log(data);
        res.send(data) 
        }
    
    
    }
    catch(e){
        console.log("err");
        res.status(400).send("Error in fetching Data ")
    }
    })
    



    module.exports=profileRouter