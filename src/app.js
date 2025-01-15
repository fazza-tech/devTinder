const express = require('express')
const {adminAuth,userAuth} = require('./middlewares/auth')

const app = express()


app.get('/user/login', userAuth, (req,res)=>{
        res.send('hi user')
        res.status(500).send('Error Happening')
})

app.get('/Admin/getAllData', (req, res) => {
    throw new Error('blabla')
    res.send('Here the all data')
})

app.delete('/Admin/deleteUser', (req, res) => {
    
    res.send('deleted a user')
})

app.use('/', (err,req,res,next) => {
    if(err){
        res.status(500).send('Error Happening')
    }
})

app.listen(3000, () => {
    console.log('This app listning server 3000');
})