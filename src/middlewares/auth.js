const adminAuth = (req,res,next)=>{
    console.log('admin auth is getting checked...');
    const token = 'xyz'
    const authentication = token === 'xyz'

    if(!authentication){
        res.status(404).send("You are not the admin")
    }else{
        next()
    }
}

const userAuth = (req,res,next)=>{
    console.log('user auth is getting checked...');
    const token = 'xyz'
    const authentication = token === 'xyz'

    if(!authentication){
        res.status(404).send("Your acc is not valid")
    }else{
        next()
    }
}

module.exports = {
    adminAuth,userAuth
}