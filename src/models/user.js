const mongoose=require("mongoose")

const validator=require("validator")

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



// const User=mongoose.model("User",userSchema)


// module.exports=User


module.exports=mongoose.model("User",userSchema)