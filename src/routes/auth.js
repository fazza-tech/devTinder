const express = require("express")
const { validateSignupData } = require("../utils/validation")
const bcrypt = require("bcrypt")
const User = require('../models/user')
const authRouter = express.Router()


authRouter.post('/signup', async (req, res) => {

    try {

        const { firstName, lastName, emailId, password } = req.body

        //validation of data
        validateSignupData(req)

        // Encrypt of password
        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword);
        //creating an instance for User schema
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword
        })
        await user.save(); //requesting for save and waiting for promise
        res.send("data added")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body

        //find email is existing or not inDB
        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {

            //create a JWT Token 
            const token = await user.getJWT()


            // Add the token to cookie and send the response back to the user
            res.cookie('token', token, {
                expires: new Date(Date.now() + 8 * 3600000)
            })
            res.send("login succesfull!!!")
        } else {
            throw new Error("Invalid credentials")
        }
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})

authRouter.post("/logout", async (req, res) => {
    res
        .cookie("token", null, {
            expires: new Date(Date.now())
        })
        .send("Logout succesfull")
})


module.exports = authRouter