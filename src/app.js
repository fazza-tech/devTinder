require('dotenv').config();
const express = require('express')
const app = express()
const connectDB = require('./config/database')


const cookieParser = require("cookie-parser")

app.use(express.json())// its a middlware
app.use(cookieParser())//middleware for parsing cookie

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use("/", authRouter, profileRouter, requestRouter,userRouter)



connectDB()
    //if that resolve
    .then(() => {
        console.log("Database connection established succesfully.");
        app.listen(3000, () => {
            console.log('This app listning server 3000');
        })
    })
    //if that reject
    .catch((err) => {
        console.log("DB cannot be connected");
    })
