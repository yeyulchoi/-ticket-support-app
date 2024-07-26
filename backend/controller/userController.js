
const asyncHandler = require('express-async-handler')
const bcrypt= require('bcryptjs')
const User = require('../models/userModel')




const registerUser = async(req, res)=>{
    const {name,email,password}=req.body


//validation
if(!name || !email || !password){
    res.status(400)
    throw new Error('You should fill out form')
}

// // find if user already exists.
const userExists =await User.findOne({email})
if(userExists){
    res.status(400)
    throw new Error('User already exist')
}

// //Hash password
const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(password, salt)

// //create user 
const user = await User.create({
    name,
    email,
    password:hashPassword
})

if(user){
    res.status(201).json({
        _id : user._id,
        name: user.name,
        email: user.email
    })
}else{
    res.status(400)
    throw new Error('/Invalid user')
}

 
}




const loginUser =asyncHandler(async(req, res)=>{
   const name=req.body.name;
   const email=req.body.email;
   const password=req.body.password;
}
)


module.exports={
    registerUser,
    loginUser
}