const Producto = require("./contenedor");


const producto = new Producto('./productos.txt');

// producto.save({
//     title: 'Pintura Acrilica 50cc',
//     description: 'Pintura Acrilica EQ para Artesanias',
//     category: 'producto',
//     price: 100,
//     stock: 15,
//     pictureUrl: 'https://ctorchia.github.io/maraartesanias/imagenes/acrilico_50.webp'
// })

// producto.getById(2);

// producto.getAll();

producto.deleteById(3)

