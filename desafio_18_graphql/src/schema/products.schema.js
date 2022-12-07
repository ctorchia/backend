const { buildSchema } = require('graphql');

const productSchema = buildSchema(`
type Product {
    id: ID!
    name: String,
    price: String,
    thumbnail: String,
    code: String,
    stock: Int,
}
input ProductInput {
    name: String,
    price: String,
    thumbnail: String,
    code: String,
    stock: Int,
}
type Query {
    getProducts: [Product],
    getProductById(id:String): Product,
}
type Mutation {
    postProduct(data: ProductInput): Product
    putProduct(id:String, datos: ProductInput): Product
    deleteProductById(id:String): Product
  }
`);

module.exports = productSchema;