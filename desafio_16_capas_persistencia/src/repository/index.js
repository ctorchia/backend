const {usersDao, messagesDao} = require('../daos/index');
const UserRepository = require('./userRepository');
const MessageRepository = require('./messageRepository');

const users = new UserRepository(usersDao );
const objMessages = new MessageRepository(messagesDao);

module.exports = {users,objMessages};