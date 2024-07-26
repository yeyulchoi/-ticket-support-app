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


app.get('/',(req,res)=>{
    res.status(200).json({name:'man', gender:'female'})
   
    
})

//Route
app.use('/api/users', require('./routes/userRoutes'))





//error handler
app.use(errorHandler)


app.listen(port,()=>{console.log(`server listen on ${port}`)})