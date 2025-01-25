const mongoose = require('mongoose')

const connectionRequest = new mongoose.Schema(
    {

        fromUserId: {
            type: mongoose.Schema.Types.ObjectId
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId
        },
        status: {
            type: String,
            enum: {
                values: ["ignore", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrected status type`
            }

        }
    },
    {
        timestamps: true
    })