const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({ 
    // username: { type: String, require: true },
    completeName: { type: String, require: true },
    phone: { type: Number, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
    // address: { type: String, require: false },
    // age: { type: Number, require: false },
    // photo: { type: String, require: false }
})

module.exports = mongoose.model('Users', UsersSchema)