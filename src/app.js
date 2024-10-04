const express=require("express")
const app=express()

app.use('/start',(req,res)=>{
res.send("starting the server");
})


app.use('/hello',(req,res)=>{
    res.send("Hlo Nodejs ");
    })
    

app.listen(8000,()=>{
    console.log("running on port 8000");
})