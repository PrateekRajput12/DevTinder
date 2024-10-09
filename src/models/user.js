const mongoose=require("mongoose")

const validator=require("validator")
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")
const { Schema } = mongoose;
const userSchema= new Schema({
firstName:{
    type:String,
required:true,
unique:true,
trim:true
,
lowercase:true,
},
lastName:{
    type:String,

},
emailId:{
    type:String,
    required:true,
unique:true,
lowercase:true,
trim:true,
validate(value){
    if(!validator.isEmail(value)){
        throw new Error("Email is not valid")
    }
    
}
},
password:{
    type:String,
    required:true
},
age:{
    type:Number,
},
gender:{
    type:String,
    lowercase:true
    ,
    validate(value){
if(!["male","female","others"].includes(value )){
throw new Error("Gender Data is not valid")
}
    },
} ,
photoURL:{
    type:String,
    required:true,
    validate(value){
        if(!validator.isURL(value)){
            throw new Error("URL is not valid")
        }
        
    }
}
,
about:{
    type:String,
    default:"Hello, I am a fictitious person. I am looking for a developer to connect with."
},
skills:{
    type:[String]
}
},{
    timestamps:true
})



userSchema.methods.getJWT= async function(){
    const user=this
    var token = await jwt.sign({ _id: user._id }, "Dev@tinder$56",{ expiresIn: '1h' });
    return token
}

// const User=mongoose.model("User",userSchema)


// module.exports=User
userSchema.methods.validatePassword=async function (passowrdInputByUser){
    const user=this
    const passwordHash=this.password
    const isPasswordValid=await bcrypt.compare(passowrdInputByUser,passwordHash)
  
    return isPasswordValid
 
}

module.exports=mongoose.model("User",userSchema)