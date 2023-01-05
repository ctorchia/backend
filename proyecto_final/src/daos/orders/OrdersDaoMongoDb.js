const ContenedorMongoDb = require('../../containers/containerMongoDb')
const Orders = require('../../mongoDB/models/orders.model') // 1

class OrdersDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(Orders)
    }

    // OJO - BORRAR

    async sendOrder(items, email) {
        console.log(email);
        try {
            // let orderNumber = await this.countDocuments({}) + 1;
            // console.log(orderNumber);
            let orderNumber = 1

            let orderData = {
                items: items,
                orderNumber: orderNumber,
                timestamp: new Date().toLocaleString(),
                state: 'generada',
                email: email
            }
            let id = await this.save(orderData);
            return id;
        } catch (error) {
            console.log("Guardando Orden - ocurrio un error: " + error);
        }
    };


}

module.exports = OrdersDaoMongoDb