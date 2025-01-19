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



module.exports = {
    validateSignupData
}