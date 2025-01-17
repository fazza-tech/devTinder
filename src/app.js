const express = require('express')
const app = express()
const connectDB = require('./config/database')
const User = require('./models/user') //schema


app.use(express.json())

//only work when we call it
app.post('/signup', async (req, res) => {
    const user = new User(req.body) //creating an instance for Useer Shema
    try {
        await user.save(); //requesting for save and waiting for promise
        res.send("data added")
    } catch (err) {
        res.status(500).send("Error saving the user:" + err.message)
    }

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

