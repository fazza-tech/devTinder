const mongoose = require('mongoose')

const validator = require("validator")


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
         trim : true,
         validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email address " + value)
            }
         }
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
        type:[String],
       validate(value) {
        if(value.length >=8){
            throw new Error(" The skills array can have a maximum of 8 skills.")
        }
       }
    },
    about : {
        type : String,
        default : "Its a default about for a user"
    },
    photourl : {
        type : String,
        default : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
    }
},
    {
        timestamps:true
    } 
)

module.exports = mongoose.model('User', userSchema)