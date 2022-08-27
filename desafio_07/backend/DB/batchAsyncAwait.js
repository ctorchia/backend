const { options } = require('../options/mariaDB')

const knex = require('knex')(options)

const products = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        // "id": 1
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        // "id": 2
    },
    {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        // "id": 3
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

const batch = async () => {
    try {
        console.log('Borrando todos los productos...');
        await knex.from('products').del()

        console.log('Insertando productos...');
        await knex('products').insert(products)  // Le podemos pasar un obj o un array

        console.log('Leyendo productos...');
        let rows = await knex.from('products').select('*')
        for (row of rows) console.log(row);

        console.log('Insertamos un producto mas...');
        await knex('products').insert({
            "title": "Calculadora",
            "price": 234.56,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
        })

        console.log('Leyendo productos...');
        rows = await knex.from('products').select('*')
        for (row of rows) console.log(`${row['title']} - ${row['price']}`);

    } catch (error) {
        console.log(error);
    } finally{
        knex.destroy()
    }
}

batch()