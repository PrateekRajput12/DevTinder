const validator=require("validator")



const validateSignUpData= (req)=>{

const {
firstName,lastName,emailId,password
}=req.body
   

if(!firstName || !lastName) {
    throw new Error("Please Enter Valid Name")
}
else if(!validator.isEmail(emailId)) {
    throw new Error("Please Enter Valid Email")

}
else if(!validator.isStrongPassword(password)){
    throw new Error("Please Enter Strong Password")
 
}
}


module.exports={
    validateSignUpData
}