const express = require('express')
const {adminAuth,userAuth} = require('./middlewares/auth')

const app = express()

app.use('/Admin', adminAuth)



app.get('/user/login', userAuth, (req,res)=>{
    res.send('hi user')
})

app.get('/Admin/getAllData', (req, res) => {
    res.send('Here the all data')
})

app.delete('/Admin/deleteUser', (req, res) => {
    res.send('deleted a user')
})

app.listen(3000, () => {
    console.log('This app listning server 3000');
})