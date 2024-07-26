const express = require('express')
const router =express.Router()
const {registerUser,loginUser}=require('../controller/userController')


router.post('/',registerUser)

router.post('/login',loginUser)

// router.put('/:id',(req,res)=>{
//     res.send('hello post')
// })

// router.delete('/:id',(req,res)=>{
//     res.send('hello post')
// })


module.exports =router