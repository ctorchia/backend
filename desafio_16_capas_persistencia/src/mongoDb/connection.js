const mongoose = require('mongoose')
const { mongoDbUrl } = require('../config')

const connectDB = async () => {
    try {
        const url = mongoDbUrl
        // const url = process.env.MONGODB_CONNECTION
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected');
    } catch (error) {
        console.error(error)   
    }
}
module.exports = connectDB


