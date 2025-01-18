const express = require('express')
const app = express()
const connectDB = require('./config/database')
const User = require('./models/user') //schema


app.use(express.json())// its a middlware

//only work when we call it
app.post('/signup', async (req, res) => {
    const user = new User(req.body) //creating an instance for Useer Shema
    try {
        await user.save(); //requesting for save and waiting for promise
        res.send("data added")
    } catch (err) {
        res.status(500).send("Error saving the user:" + err.message)
    }

})

//find one user based on filter
app.get('/users', async (req, res) => {
    const userEmailId = req.body.emailId;

    try {
        const users = await User.find({ emailId: userEmailId })
        if (users === 0) {
            res.status(404).send("User not found")
        } else {
            res.send(users)
        }
    } catch (err) {
        res.status(400).send("Something went wrong")
    }


})
//get every users documents
app.get('/feed', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(404).status("Something went wrong")
    }
})

//find only one and return only onw based on filter
app.get('/getOne', async (req, res) => {
    const userLastName = req.body.lastName;
    try {
        const user = await User.findOne({ lastName: userLastName }.exec())
        res.send(user)
    } catch (err) {
        res.status(404).send("Something went wrong")
    }

})

//find by id
app.get('/getById', async (req,res)=>{
    const userId = req.body._id

    try{
        const user = await User.findById(userId).exec()
        res.send(user)
    }catch(err){
        res.status(404).send("Error")
    }
})

//delete user
app.delete('/user', async (req,res)=>{
    const userId = req.body._id
    

try{
    const user = await User.findByIdAndDelete(userId)
    res.send("user deleted succesfully ")
}catch(err){
    res.status(400).send("something went wrong")
}
    
})

//update a user bu id
app.patch('/user', async (req,res)=>{
    const userId = req.body._id
    // const name = req.body.firstName
    // const email = req.body.emailId
    const data = req.body
    console.log(data);
    try{
        const user = await User.findByIdAndUpdate(userId,data)
        console.log(user);
        res.send("User updated succesfully")
    }catch(err){
        res.status(400).send("something went wrong...")
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

