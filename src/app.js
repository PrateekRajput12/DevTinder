const express=require("express");
const connectDB= require('./config/database')
const app=express()

const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

const {userAuth} = require('./middlewares/auth')


const profileRouter=require("./routes/profile")
const userRouter=require("./routes/user")
const authRouter=require("./routes/auth")


app.use("/",profileRouter)
app.use("/",userRouter)
app.use("/",authRouter)



app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    // sending a connection reques
    console.log("sending connection request")
    res.send("connection request sent")
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
