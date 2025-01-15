const express = require('express')

const app = express()

app.get('/user/getAlldata' , (req,res)=>{
    const token = "xyz1221"
    const isAuthorized = token === 'xyz';

    if(isAuthorized){
        res.send('all data display here')
    }else{
        res.status(404).send('unothorized sender')
    }
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})