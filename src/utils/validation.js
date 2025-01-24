const validator = require("validator")

const validateSignupData = (req) => {
   
     const {firstName, lastName, emailId, password} = req.body;
      
     if(!firstName || !lastName){
        throw new Error ("Please fill the required field")
     }else if(!validator.isEmail(emailId)){
        throw new Error ("The email id is not valid")
     }else if(!validator.isStrongPassword(password)){
        throw new Error ("The password is not enough strong")
     }
}

const validateProfileEdit = (req) => {
   const allowedFields = ["firstName","lastName","age","gender","skills","about","photourl"]

   const isEditAllowed = Object.keys(req.body).every(fields => allowedFields.includes(fields));
   return isEditAllowed
   
}



module.exports = {
    validateSignupData,
    validateProfileEdit
}