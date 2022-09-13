const mongoose = require('mongoose')  //Hacerlo con Import

// mongodb+srv://ctorchia:Mongo2468@cluster0.vg0dm1l.mongodb.net/test   // Compass Connection
// mongodb+srv://ctorchia:Mongo2468@cluster0.vg0dm1l.mongodb.net/?retryWrites=true&w=majority   //See Process.env ( Connection code)

const connectDB = async () => {
    try {
        // const url = 'mongodb://localhost:27017/ecommerce'
        // const url = 'mongodb+srv://ctorchia:Mongo2468@cluster0.vg0dm1l.mongodb.net/?retryWrites=true&w=majority'

        const url = process.env.MONGODB_CONNECTION
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


