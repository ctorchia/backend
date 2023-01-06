const mongoose = require('mongoose')

const MessagesSchema = new mongoose.Schema({ 
    // author: {  
    //     id: { type: String, require: true },
    //     firstName: { type: String, require: true },
    //     lastName: { type: String, require: true },
    //     age: { type: Number, require: true },
    //     alias: { type: String, require: true },
    //     avatar: { type: String, require: true },
    //   },
      email: { type: String, require: true },
      type: { type: String, require: true },
      timestamp: { type: String, require: true },
      text: { type: String, require: true },
})

module.exports = mongoose.model('Messages', MessagesSchema)