const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({ 
    author: {  
        id: { type: String, require: true },
        nombre: { type: String, require: true },
        apellido: { type: String, require: true },
        edad: { type: Number, require: true },
        alias: { type: String, require: true },
        avatar: { type: String, require: true },
      },
      date: { type: String, require: true },
      text: { type: String, require: true },
})

module.exports = mongoose.model('Messages', MessagesSchema)