const express = require('express')

const app = express()


app.get("/user/:userId/:password", (req,res) => {
    console.log(req.params);
    res.send({firstName :"Fazza", lastname:"Al Mammazrayillakath"})
})

app.post('/user', (req,res)=>{
    res.send("Saved data to DB ")
})

app.delete('/user', (req,res)=>{
    res.send("Deleted a user")
})

app.patch('/user', (req,res)=>{
    res.send("Updated a user  ")
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})