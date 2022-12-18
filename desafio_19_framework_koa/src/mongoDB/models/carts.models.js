const mongoose = require('mongoose')

const CartsSchema = new mongoose.Schema({ 
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    timestamp: {
        type: String,
        required: false,
        trim: true
    },
    products: {
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('Carts', CartsSchema)