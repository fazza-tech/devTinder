const express = require('express')
const { adminAuth, userAuth } = require('./middlewares/auth')
const connectDB = require('./config/database')
const app = express()
const User = require('./models/user')

app.post('/signup', async (req,res)=>{
    const user = new User({
        firstName : "Fazal",
        lastName:"Mammazrayil",
        emailId : "fazalmammazrayil@gmail.com",
        password: "gyd54sdsdsjd",
        age: "23",
        gender:"Male"
    })
    await user.save();
    res.send("data added")
})

connectDB()
    .then(() => {
        console.log("Database connection established succesfully.");
        app.listen(3000, () => {
            console.log('This app listning server 3000');
        })
    })
    .catch((err) => {
        console.log("DB cannot be connected");
    })

