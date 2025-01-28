const express = require("express")
const {userAuth} = require("../middlewares/auth")
const requestRouter = express.Router()
const ConnectionRequest = require("../models/connectionRequest")



requestRouter.post('/request/send/:status/:toUserId',userAuth, async (req,res)=>{
    try{
        const fromUserId= req.user._id
        const toUserId =req.params.toUserId
        const  status = req.params.status

        const allowedStatus = ["ignored","interested"]

        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid status type")
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save()

        res.json({
            message:"Connection request send Succesfully",
            data
        })


    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})

module.exports = requestRouter