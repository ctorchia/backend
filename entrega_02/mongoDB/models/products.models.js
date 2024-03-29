const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({ 
    id: {
        type: Number,
        required: false,
        trim: true,
        unique: true
    },
    timestamp: {
        type: String,
        required: false,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        max: 100
    },
    description: {
        type: String,
        required: false,
        trim: true,
        max: 100
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
        max: 200
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
    }
})

module.exports = mongoose.model('Products', ProductsSchema)