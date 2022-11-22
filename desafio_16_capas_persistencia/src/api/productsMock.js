const ContenedorMemoria = require('../containers/containerMem')
const generateRandomProduct = require('../utils/generateRandomProduct.js')

class ApiProductsMock extends ContenedorMemoria {
    constructor(){
        super();
    }

    async popular(quantity = 5){
        const newProducts = [];

        for (let i = 0; i < quantity; i++) {
            const newRandomProduct = generateRandomProduct();
            const savedProduct = await this.save(newRandomProduct);
            newProducts.push(savedProduct);
        }

        return newProducts;
    }

}

module.exports = ApiProductsMock

