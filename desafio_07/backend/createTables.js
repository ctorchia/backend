const { optionsMariaDB } = require('../backend/options/mariaDB')
const { optionsSqlite3 } = require('../backend/options/sqlite3.js')

const knexMariaDB = require('knex')(optionsMariaDB)
const knexSqlite3 = require('knex')(optionsSqlite3)

const products = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    },
    {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    },
    {
        "title": "Regla",
        "price": 356.67,
        "thumbnail": "https://cdn0.iconfinder.com/data/icons/graphic-design-tools-1/32/Ruler-Measurement-Scale-Measure-256.png",
        // "id": 4
    },
    {
        "title": "Goma",
        "price": 56.67,
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/office-icons-17/512/ilustracoes_04-08-256.png",
        // "id": 5
    },
    {
        "title": "Teclado",
        "price": "1234",
        "thumbnail": "https://cdn1.iconfinder.com/data/icons/software-hardware/200/software-24-128.png",
        // "id": 6
    }
]

const nameTableMariaDB = 'products'

const batchMariaDB = async () => {
    try {
        console.log('Creando tabla Products...');
        await knexMariaDB.schema.createTable(nameTableMariaDB, table =>{
            table.increments('id')
            table.string('title')
            table.float('price')
            table.string('thumbnail')
        })
        
        console.log('Insertando productos...');
        await knexMariaDB(nameTableMariaDB).insert(products)  // Le podemos pasar un obj o un array

    } catch (error) {
        console.log(error);
    } finally{
        knexMariaDB.destroy()
    }
}

// ----------------------------------------------------------------------

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

const nameTableSqlite3 = "messages" 

const batchSqlite3 = async () =>{
    try {
        console.log('Creando tabla Mensajes...');
        await knexSqlite3.schema.createTable(nameTableSqlite3, table =>{
            table.increments('id')
            table.string('name')
            table.float('dateMessage')
            table.string('message')
        })

        console.log('Insertando mensajes...');
        await knexSqlite3(nameTableSqlite3).insert(messages)  // Le podemos pasar un obj o un array

    } catch (error) {
        console.log(error)
    } finally {
        knexSqlite3.destroy()
    }
}

batchMariaDB()
batchSqlite3()