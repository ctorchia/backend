const normalizr = require("normalizr");
const { normalize, denormalize, schema } = normalizr
// const normalize = normalizr.normalize;
//const denormalize = normalizr.denormalize;
// const schema = normalizr.schema;

const util = require('util');

const print = (obj) => {
    console.log(util.inspect(obj, false, 12, true /* enable colors */))
}

function normalizar (original){

    // console.log(original)

    const authorSchema = new schema.Entity('author');

    const messageSchema = new schema.Entity('message',{
        author:authorSchema
    });

    const messagesSchema = new schema.Entity('messages',{
        messages:[messageSchema]
    });

    const normalizedData = normalize(original,messagesSchema);

    console.log(normalizedData)

    const denormalizedData = denormalize(normalizedData.result, messagesSchema, normalizedData.entities);
    console.log(denormalizedData)

    print(normalizedData)

    // return normalizedData
    return denormalizedData


}

module.exports = normalizar