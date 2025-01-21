const express = require('express')
const app = express()
const connectDB = require('./config/database')
const User = require('./models/user') //schema
const { validateSignupData } = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken');
const {userAuth} = require("./middlewares/auth")

app.use(express.json())// its a middlware
app.use(cookieParser())//middleware for parsing cookie

//only work when we call it
app.post('/signup', async (req, res) => {

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

app.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body

        //find email is existing or not inDB
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("Invalid credentials")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {

            //create a JWT Token 
            const token = await jwt.sign({_id: user._id},"Fazza$434")
            console.log(token);

            // Add the token to cookie and send the response back to the user
            res.cookie('token',token)
            res.send("login succesfull!!!")
        }else{
            throw new Error("Invalid credentials")
        }
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message)
    }
   
})

app.get('/profile',userAuth, async (req,res)=>{
    try{
    const user = req.user;
    
    res.send(user)
    }catch(err){
        res.status(400).send("Error saving the user:" + err.message)
    }
    
})

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
