const { faker } = require ('@faker-js/faker/locale/es');

function generateRandomProduct(){
    return {
        title:faker.commerce.product(),
        price:faker.commerce.price(),
        thumbnail:faker.image.image(100,100,true)
    }
}

module.exports = generateRandomProduct