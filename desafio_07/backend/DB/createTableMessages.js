// const { options } = require('../options/mariaDB')
const { optionsSqlite3: options } = require('../options/sqlite3.js')

const knex = require('knex') (options)

// knex.schema.createTable('products', table =>{
//     table.increments('id')
//     table.string('title')
//     table.float('price')
//     table.string('thumbnail')
// })
// .then(() => console.log('Table created'))
// .catch((err) => {console.log(err); throw err })
// .finally(() => knex.destroy())

const nameTable = "messages" 

const createTable = async (nameTable) =>{
    try {
        
        await knex.schema.createTable(nameTable, table =>{
            table.increments('id')
            table.string('name')
            table.float('dateMessage')
            table.string('message')
        })

    } catch (error) {
        console.log(error)
    } finally {
        knex.destroy()
    }
}

createTable(nameTable)

