const express=require("express")
const profileRouter=express()
const {userAuth}=require("../middlewares/auth")

const {validateEditProfile}=require('../utils/validator')
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
    

    profileRouter.patch("/profile/Edit",userAuth,async(req,res)=>{
try{
    if(!validateEditProfile(req)){
        throw new Error("Invalid Edit Request")
    }

    const loggedInUser=req.user
    console.log("logged in user"+loggedInUser);
 Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
 console.log("Updated Logged in userr" + loggedInUser);
 loggedInUser.save()
//   res.send("Updated Success fully "+ loggedInUser)
res.json({
    message:`${loggedInUser.firstName} , your profile updated`,
    data:loggedInUser
})
}
catch(e){
    res.status(400).send("Error :: "+e.message)
}
    })


    module.exports=profileRouter