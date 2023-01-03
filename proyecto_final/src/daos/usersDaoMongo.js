const ContenedorMongoDb = require('../containers/containerMongoDb')
const logger = require('../logger/logger')
const Users = require('../mongoDb/models/users.model') // 1

class UsersDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        super(Users)
    }

    // Otras funciones diferentes

    async getByEmail(email) {
        try {
            let objeto = await this.model.find({ email: email })

            if (objeto) {
                logger.info(objeto)
                return objeto[0]
            } else {
                logger.error('El item no existe') 
                return null
            }
        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = UsersDaoMongoDb