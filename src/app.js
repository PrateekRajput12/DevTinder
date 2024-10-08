const express=require("express");
const connectDB= require('./config/database')
const app=express()

const User=require('./models/user');
const user = require("./models/user");

app.use(express.json())
app.post("/signup",async(req,res)=>{
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


const user=new User(req.body)
try{
    await user.save()

res.send("Done")
}
catch(err){
    res.status(400).send("Error in savin Data "+err.message)
}
})



app.get("/user",async(req,res)=>{
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


app.get("/feed",async(req,res)=>{
    try{
        const allusers=await user.find({})
        res.send(allusers)
    }
    catch(e){
        console.log("Error in fetching Data ")
        res.status(400).send("Error in fetching Data ")
    }
})




app.get('/user/:id',async(req,res)=>{
    try{
        const userById=await user.findById(req.params.id)
        res.send(userById)
    }
    catch{
        res.status(404).send("User not found")
    }
})
app.delete('/user/:id',async(req,res)=>{
    try{
        const userById=await user.findByIdAndDelete(req.params.id)

       res.send("deleted user")
    }
    catch{
        res.status(404).send("User not found")
    }
})

app.patch("/user/:id",async(req,res)=>{

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
connectDB().then(()=>{
    console.log("DB COnnection established");
    app.listen(7070,()=>{
        console.log("Server started on port 7070");
    })
})
.catch((err)=>{
    console.error("Error connecting to DB");
})
