const path =require('path')
const express = require('express')
const app = express();
const colors= require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000;

connectDB()

//body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))




//Route
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve Frontend
if(process.env.NODE_ENV ==='production') {
    //set build folder as static
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*', (req,res)=>res.sendFile(__dirname,'../', 'frontend','build','index.html'))    // hit /api/users/ api/tickets first , and then anything else (*)
}else{
    app.get('/',(req,res)=>{
        res.status(200).json({message:'Welcome to the Support Desk API'})
    })
}


//error handler
app.use(errorHandler)


app.listen(port,()=>{console.log(`server listen on ${port}`)})