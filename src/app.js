const express = require('express')

const app = express()

app.use('/Admin', (req,res,next)=>{
    console.log('admin auth is getting checked...');
    const token = 'xyz'
    const authentication = token === 'xyz'

    if(!authentication){
        res.status(404).send("You are not the admin")
    }else{
        next()
    }
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