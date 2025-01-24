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
        console.log(loggedUser);
        Object.keys(req.body).every(key => loggedUser[key] = req.body[key])
        console.log();
    } 
    catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = profileRouter