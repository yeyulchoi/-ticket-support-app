const mongoose = require('mongoose');


const connectDB=async()=>{

    try {
        const conn =await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected to ${conn.connection.host}.`.cyan.underline)
    } catch (error) {
        console.log(`Error : wrong wrong connection ${error.message}`.red.underline.bold)
        process.exit(1)
    }

}





module.exports = connectDB