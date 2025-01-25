const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,

    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid Email address " + value)
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 8
    },
    gender: {
        type: String,
        enum:{
            values: ["male","female","others"],
            message: `{VALUE} is not a valid gender type`
        },
        // validate(value) {
        //     if (!["male", "female", "others"].includes(value)) {
        //         throw new Error("Gender data is not valid")
        //     }
        // }
    },
    skills: {
        type: [String],
        validate(value) {
            if (value.length >= 8) {
                throw new Error(" The skills array can have a maximum of 8 skills.")
            }
        }
    },
    about: {
        type: String,
        default: "Its a default about for a user"
    },
    photourl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
    }
},
    {
        timestamps: true
    }
);

userSchema.methods.getJWT = async function () {
    const user = this

    const token = await jwt.sign({ _id: user._id }, "Fazza$434", { expiresIn: "1d" })
    
    console.log(token);
    return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this //this referring the instance inside the DB 
    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid
}

module.exports = mongoose.model('User', userSchema)