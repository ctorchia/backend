const normalizr = require("normalizr");
const { normalize, denormalize, schema } = normalizr

const util = require('util');

const print = (obj) => {
    console.log(util.inspect(obj, false, 12, true /* enable colors */))
}

function normalizar (original){

    const authorSchema = new schema.Entity('author');

    const messageSchema = new schema.Entity('message',{
        author:authorSchema
    });

    const messagesSchema = new schema.Entity('messages',{
        messages: [ messageSchema ]
    });

    const normalizedData = normalize(original,messagesSchema);

    return normalizedData

}

module.exports = normalizar