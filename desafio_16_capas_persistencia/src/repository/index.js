const {usersDao, messagesDao} = require('../daos/index');
const UserRepository = require('./userRepository');
const MessageRepository = require('./messageRepository');

const users = new UserRepository(usersDao );
const messages = new MessageRepository(messagesDao);

module.exports = {users,messages};