const express = require('express')
const app = express();
const port = 5050;


app.get('/',(req,res)=>{
    res.json({name:"Yeyul", gender:"female"})
})






app.listen(port,()=>{console.log(`server listen on ${port}`)})