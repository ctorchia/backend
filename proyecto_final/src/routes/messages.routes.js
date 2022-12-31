// const MessagesDaoMongoDb = require('../daos/messages/messagesDaoMongo');
// const objMessages = new MessagesDaoMongoDb()
// const {objMessages} = require('../repository/index');

// const express = require("express");
// const router = express.Router();

const { messagesDao } = require("../daos/index");
const objMessages = messagesDao

// const normalizar = require('../utils/normalizar');
// const logger = require('../logger/logger');

routerMessages = (socket, io) => {

    // ----------------- Chat ------------------------------- //

    objMessages.getAll().then(chats => {
        // let chatNormalizado = normalizar({ id: 'mensajes', messages: chats });
        // socket.emit('mensajeChat-server', chats);
        io.sockets.emit('mensajeChat-server', chats);
        // console.log('chats: ', chats);
    })

    socket.on('mensajeChat-nuevo', messageComplete => {
        // console.log(messageComplete);
        console.log('Posicion 1');
        objMessages.save(messageComplete).then(res => {
            objMessages.getAll().then(chats => {
                // let chatNormalizado = normalizar({ id: 'mensajes', messages: chats });
                io.sockets.emit('mensajeChat-server', chats);
            })
        }
        );
    })
}

module.exports = routerMessages