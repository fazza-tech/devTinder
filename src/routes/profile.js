const express = require("express")
const { userAuth } = require("../middlewares/auth")
const profileRouter = express.Router()
const { validateProfileEdit } = require("../utils/validation")

profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user;

        res.send(user)
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message)
    }

})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {

        if (!validateProfileEdit(req)) {
            throw new Error("Invalid edit request")
        }

        const loggedUser = req.user
        
        Object.keys(req.body).forEach(key => loggedUser[key] = req.body[key])
        await loggedUser.save()
        
        res.json({
            message:`${loggedUser.firstName}, your profile updated succesfully.`,
            data:loggedUser
        })
    } 
    catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = profileRouter