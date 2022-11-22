const dotenv = require('dotenv').config() // 1

let usersDao
let messagesDao

switch (process.env.TECH) {
    case 'file':
        const usersDaoFile = require('./daos/users/usersDaoFile')
        const messagesDaoFile = require('./daos/messages/messagesDaoFile')

        usersDao = new usersDaoFile()
        messagesDao = new messagesDaoFile()
        break
    case 'mongoDb':
        const usersDaoMongoDb = require('./users/usersDaoMongo')
        const messagesDaoMongoDb = require('./messages/messagesDaoMongo')

        usersDao = new usersDaoMongoDb()
        messagesDao = new messagesDaoMongoDb()
        break
}

module.exports = {usersDao, messagesDao}