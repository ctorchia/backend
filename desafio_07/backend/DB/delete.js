const { options } = require('../options/mariaDB')

const knex = require('knex')(options)

knex.from('products').del()
// knex.from('products').where('price','>',1000).del()
    .then(() => console.log('Tabla borrada'))
    .catch((err) => { console.log(err); throw err })
    .finally(() => knex.destroy())