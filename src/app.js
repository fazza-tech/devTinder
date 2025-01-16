const express = require('express')
const app = express()
const connectDB = require('./config/database')
const User = require('./models/user') //schema

const userObj = {
    firstName : "Dani ",
    lastName:"Daniels",
    emailId : "danixxxx@gmail.com",
    password: "dannyhot456",
    age: "43",
    gender:"Female"
}
//only work when we call it
app.post('/signup', async (req,res)=>{
    const user = new User(userObj) //creating an instance for Useer Shema
    await user.save(); //requesting for save and waiting for promise
    res.send("data added")
})

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

