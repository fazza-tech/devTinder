const mongoose = require('mongoose')

const connectionRequest = new mongoose.Schema(
    {

        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required:true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            required:true
        },
        status: {
            type: String,
            required:true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrected status type`
            }

        }
    },
    {
        timestamps: true
    })

    const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequest)

    module.exports = ConnectionRequest;