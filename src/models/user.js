const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName :  {
        type: String,
        required:true
    },
    lastName :{
        type: String
    },
    emailId :{
         type:String,
         required:true,
         unique:true,
         lowercase : true,
         trim : true
    },
    password :{ 
        type:String,
        required:true
    },
    age : {
        type:Number,
        min : 8
    },
    gender : {
        type:String,
        validate(value) {
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    skills : {
        type:[String]
    },
    about : {
        type : String,
        default : "Its a default about for a user"
    },
    photourl : {
        type : String,
        default : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
    }
})

module.exports = mongoose.model('User', userSchema)