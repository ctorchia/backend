const mongoose = require('mongoose')
// const { MONGODB_CONNECTION } = require('../config')

const MONGODB_CONNECTION='mongodb+srv://ctorchia:Mongo2468@cluster0.vg0dm1l.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        const url = MONGODB_CONNECTION
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


