const { options } = require('../options/mariaDB')

const knex = require('knex')(options)

knex.from('products').select('*').where('price', '>', 100).orderBy('price','asc')  // Siempre devuelve un array
    .then(resp => {
        for (obj of resp) {
            console.log(`El id: ${obj.id} es un ${obj.title} y cuesta: ${obj.price}`)
        }
    })
    .catch(err => console.log(err))
    .finally(() => knex.destroy())