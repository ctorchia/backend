const ContenedorMongoDb = require('../containers/ContenedorMongoDb')
const Messages = require('../mongoDb/models/messages.model') // 1

class MessagesDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        super(Messages)
    }

    // Otras funciones diferentes

}

module.exports = MessagesDaoMongoDb