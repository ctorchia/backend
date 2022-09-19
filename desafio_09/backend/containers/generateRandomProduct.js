const { faker } = require ('');

function generateRandomProduct(){
    return {
        nombre:faker.commerce.product(),
        precio:faker.commerce.price(),
        foto:faker.image.image(100,100,true)
    }
}

module.exports = generateRandomProduct