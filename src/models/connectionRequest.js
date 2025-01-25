const mongoose = require('mongoose')

const connectionRequest = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        
            
    }
})