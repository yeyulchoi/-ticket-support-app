
const asyncHandler = require('express-async-handler')
const bcrypt= require('bcryptjs')
const User = require('../models/userModel')
const jwt= require('jsonwebtoken')




const registerUser = asyncHandler( async(req, res)=>{
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
    password:hashPassword,


})

if(user){
    res.status(201).json({
        _id : user._id,
        name: user.name,
        email: user.email,
        token:generateToken(user._id)
    })
}else{
    res.status(400)
    throw new Error('/Invalid user')
}

 
})




const loginUser =asyncHandler(async(req, res)=>{
    const {email, password}=req.body;
    const user = await User.findOne({email})

    //check user and pw match
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id : user._id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid credential ')
    }
 
})

// get current user
//route: api/users/me
//access public

const getMe=asyncHandler(async(req, res)=>{
   const user ={
    id: req.user._id,
    email:req.user.email,
    name: req.user.name
   }
   res.status(200).json(user)
})


const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '30d'})
}



module.exports={
    registerUser,
    loginUser, 
    getMe
}