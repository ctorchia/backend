const mongoose = require('mongoose')
const { MONGODB_CONNECTION } = require('../config')

const connectDB = async () => {
    try {
        const url = MONGODB_CONNECTION
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        logger.info('Database connected');
    } catch (error) {
        console.error(error)   
    }
}
module.exports = connectDB


