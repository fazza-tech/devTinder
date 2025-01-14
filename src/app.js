const express = require('express')

const app = express()

app.get('/', (req,res) =>{
    res.send("Welcome")
})

app.get('/login', (req,res) =>{
    res.send("Its a Login Page")
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})