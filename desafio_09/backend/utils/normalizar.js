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

    // const denormalizedData = denormalize(normalizedData.result, messagesSchema, normalizedData.entities);

    print(original)
    // console.log(original)

    // console.log(JSON.stringify(original).length)
    // console.log(JSON.stringify(normalizedData).length)

    console.log(JSON.stringify(original))
    console.log(JSON.stringify(normalizedData))

    console.log(normalizedData)

    return normalizedData

}

module.exports = normalizar