const ContenedorMongoDb = require('../containers/ContenedorMongoDb')
const Users = require('../mongoDb/models/users.model') // 1

class UsersDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        super(Users)
    }

    // Otras funciones diferentes

}

module.exports = UsersDaoMongoDb