const ContenedorMongoDb = require('../../containers/containerMongoDb')
const Messages = require('../../mongoDb/models/messages.model') // 1

class MessagesDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        super(Messages)
    }

    // getByEmail(Number) : Object

    async getAllByEmail(email) {
        try {
            const listaMensajes = await this.getAll()
            console.log(email);
            let mensajesFiltrados = listaMensajes.filter(mensaje => mensaje.author.id == email)
            // console.log(mensajesFiltrados);
            return mensajesFiltrados

        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = MessagesDaoMongoDb