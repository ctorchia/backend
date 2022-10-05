const ContenedorMongoDb = require('../containers/ContenedorMongoDb')
const Users = require('../mongoDb/models/users.model') // 1

class UsersDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        super(Users)
    }

    // Otras funciones diferentes

    async getByUsername(username) {
        try {
            let objeto = await this.model.find({ username: username })

            if (objeto) {
                console.log(objeto)
                return objeto[0]
            } else {
                console.log('El item no existe');
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UsersDaoMongoDb