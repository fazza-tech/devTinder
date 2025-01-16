const mongoose = require("mongoose")


const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://c7wfYRor69zCUhM7:Fazza2531@cluster0.t9jk4.mongodb.net/devTinder"
    )
}

module.exports= connectDB

