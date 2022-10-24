const MessagesDaoMongoDb = require('../daos/messagesDaoMongo');
const objMessages = new MessagesDaoMongoDb()
const normalizar = require('../utils/normalizar');

const logger = require('../logger/logger');

messages = (socket,io) => {

    // ----------------- Chat ------------------------------- //

    objMessages.getAll().then(chats => {
        let chatNormalizado = normalizar({ id: 'mensajes', messages: chats });
        io.sockets.emit('mensajeChat-server', chatNormalizado);
    })

    socket.on('mensajeChat-nuevo', messageComplete => {
        objMessages.save(messageComplete).then(res => {
            objMessages.getAll().then(chats => {
                let chatNormalizado = normalizar({ id: 'mensajes', messages: chats });
                io.sockets.emit('mensajeChat-server', chatNormalizado);
            })
        }
        );
    })
}

module.exports = messages