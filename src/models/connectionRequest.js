const mongoose=require("mongoose")
// const user = require("./user")
const User=require("./user")
const connectionRequestSchema=new mongoose.Schema({


    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    status:{
        type:String,
        require:true,
        enum:{
            values:["ignore" , "interested", "accepted" ,"rejected"],
            message:`{VALUE} is incorrect status type`
        },
    },
},
{
    timestamps:true
}
)

connectionRequestSchema.index({
    fromUserId:1,toUserId:1
})


connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send Request to yourself")
    }
    next();
})

const ConnectionRequestModel=new mongoose.model("ConnectionRequestModel",connectionRequestSchema)


module.exports=ConnectionRequestModel