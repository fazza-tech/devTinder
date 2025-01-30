const express = require('express')
const app = express()
const connectDB = require('./config/database')
const User = require('./models/user') //schema

const cookieParser = require("cookie-parser")

app.use(express.json())// its a middlware
app.use(cookieParser())//middleware for parsing cookie

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use("/", authRouter, profileRouter, requestRouter,userRouter)



//only work when we call it





//find one user based on filter
app.get('/users', async (req, res) => {
    const userEmailId = req.body.emailId;

    try {
        const users = await User.find({ emailId: userEmailId });
        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//get every users documents
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(404).send("Something went wrong");
    }
});

//find only one and return only one based on filter
app.get('/getOne', async (req, res) => {
    const userLastName = req.body.lastName;
    try {
        const user = await User.findOne({ lastName: userLastName });
        res.send(user);
    } catch (err) {
        res.status(404).send("Something went wrong");
    }
});

//find by id
app.get('/getById', async (req, res) => {
    const userId = req.body._id;

    try {
        const user = await User.findById(userId);
        res.send(user);
    } catch (err) {
        res.status(404).send("Error");
    }
});

//delete user
app.delete('/user', async (req, res) => {
    const userId = req.body._id


    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted succesfully ")
    } catch (err) {
        res.status(400).send("something went wrong")
    }

})

//update a user bu id
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;

    // const name = req.body.firstName
    // const email = req.body.emailId
    const data = req.body

    try {
        const ALLOWED_UPDATES = [
            "firstName",
            "lastName",
            "age",
            "gender",
            "skills",
            "about",
            "photourl",
            "password"
        ]

        const isUPDATE_ALLOWED = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUPDATE_ALLOWED) {
            throw new Error("Update not allowed ")
        }
        const user = await User.findByIdAndUpdate(userId, data, { runValidators: true })
        res.send("User updated succesfully")
    } catch (err) {
        res.status(400).send("something went wrong..." + err.message)
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
