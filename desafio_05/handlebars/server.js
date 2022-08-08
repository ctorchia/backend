const express = require('express')
const handlebars = require('express-handlebars')
// const { Router } = express
// const Producto = require("./contenedor")
// const producto = new Producto('./productos.txt')

const app = express()
// const routerProductos = Router()
// app.use(express.urlencoded({ extended: true }))

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
})

app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static('public'))

const apiTest = () => [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
    },
    {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
    },
    {
        "title": "Regla",
        "price": 356.67,
        "thumbnail": "https://cdn0.iconfinder.com/data/icons/graphic-design-tools-1/32/Ruler-Measurement-Scale-Measure-256.png",
        "id": 4
    }
]

app.get('/', (req, res) => {
    res.render('main', {
        listExist:true,
        mensaje:'Lista de Productos',
        list: apiTest()
    })
})

app.post('/productos', (req, res) => {
    
    const obj = req.body
    console.log(obj)
    // Validar si viene vacio
    productos.push(obj)
    res.render('main', {
        mensaje:'Lista de Productos',
        listExist:true,
    })
})

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use('/api/productos', routerProductos)
// server.on('error', (err) => console.log(err))

// //********************** CONTROLADOR DE PRODUCTOS ********************************************

// //********************** GET (Devuelve todos los productos) **********************************

// routerProductos.get('/', async (req, res) => {
//     const listaProductos = await producto.getAll()
//     res.json(listaProductos)
// })

// //********************** GET (Devuelve un producto según ID) **********************************

// routerProductos.get('/:id', async (req, res) => {

//     const { id } = req.params
//     const productoById = await producto.getById(parseInt(id))
//     productoById ?
//         res.json(productoById)
//         :
//         res.json({ error: 'Producto no encontrado' })
// })

// //************************ POST (Recibe y Agrega un producto) **********************************

// routerProductos.post('/', async (req, res) => {
//     const idProduct = await producto.save(req.body)
//     const productoById = await producto.getById(parseInt(idProduct))
//     res.json(productoById)
// })

// //************************ PUT (Recibe y Actualiza un producto según su ID) ***********************

// routerProductos.put('/:id', async (req, res) => {

//     const { id } = req.params
//     const respuesta = await producto.updateById(parseInt(id), req.body)
//     res.json(respuesta)
// })

// //************************ DELETE (Elimina un producto según su ID) ***********************

// routerProductos.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     await producto.deleteById(parseInt(id))
// })
