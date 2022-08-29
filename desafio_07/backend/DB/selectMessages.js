const { optionsSqlite3: options } = require('../options/sqlite3.js')

const knex = require('knex')(options)

knex.from('messages').select('*')
    .then(resp => {
        for (obj of resp) {
            console.log(`El id: ${obj.id} es un ${obj.name} y cuesta: ${obj.message}`)
        }
    })
    .catch(err => console.log(err))
    .finally(() => knex.destroy())
