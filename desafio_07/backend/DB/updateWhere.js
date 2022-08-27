const { options } = require('../options/mariaDB')

const knex = require('knex')(options)

knex.from('products').where('price', 1234).update({ price: 4444 })
    .then(() => console.log('Producto Actualizado'))
    .catch((err) => { console.log(err); throw err })
    .finally(() => knex.destroy())