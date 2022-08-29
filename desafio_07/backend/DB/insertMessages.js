const { optionsSqlite3: options } = require('../options/sqlite3.js')

const knex = require('knex')(options)

const messages = [
    {
        "name": "cristian@gmail.com",
        "dateMessage": "16/08/2022 11:59:26",
        "message": "Hola"
    },
    {
        "name": "mara@gmail.com",
        "dateMessage": "16/08/2022 11:59:37",
        "message": "Como estas?"
    },
    {
        "name": "cristian@gmail.com",
        "dateMessage": "16/08/2022 11:59:55",
        "message": "Todo bien!"
    },
    {
        "name": "cristian@gmail.com",
        "dateMessage": "16/08/2022 12:05:36",
        "message": "Todo perfecto!"
    },
    {
        "name": "mara@gmail.com",
        "dateMessage": "16/08/2022 12:10:59",
        "message": "Me alegro"
    },
    {
        "name": "cristian@gmail.com",
        "dateMessage": "16/08/2022 12:11:14",
        "message": "Y vos?"
    }
]

knex('messages').insert(messages)  // Le podemos pasar un obj o un array
    .then(() => console.log('Productos Agregados'))
    .catch((err) => { console.log(err); throw err })
    .finally(() => knex.destroy())