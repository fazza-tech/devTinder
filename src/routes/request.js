const express = require("express")
const {userAuth} = require("../middlewares/auth")
const requestRouter = express.Router()
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")


requestRouter.post('/request/send/:status/:toUserId',userAuth, async (req,res)=>{
    try{
        const fromUserId= req.user._id
        const toUserId =req.params.toUserId
        const  status = req.params.status

        const allowedStatus = ["ignored","interested"]

        if(!allowedStatus.includes(status)){
            return res
            .status(400)
            .json({message:"Invalid status type: " +status})
        }

        //If there is no userID exizt in our DB
        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res  
                    .status(400)
                    .send({message:"User not found"})
        }

        //If there is any exixsting connection
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[{fromUserId,toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        })
        if(existingConnectionRequest) {
            return res
                    .status(400)
                    .send({message:"Connection request already exist"})
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