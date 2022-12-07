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
    getProducts(key: String, value: String): [Product],
    getProduct(id:String): Product,
}
type Mutation {
    postProducts(data: ProductInput): Product
    putProducts(id:String, datos: ProductInput): Product
    deleteProducts(id:String): Product
  }
`);

module.exports = productSchema;