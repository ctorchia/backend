const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080

app.set('view engine', 'ejs')
app.set('views', './views')

const productos = [{
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
}] 

app.get('/', (req, res) => {
    
    res.render('pages/index', {
        mensaje: 'Lista de Productos:',
        productos
    })
})

app.post('/productos', (req, res) => {
    
    const obj = req.body
    console.log(obj)
    // Validar si viene vacio
    productos.push(obj)
    res.render('pages/index', {
        mensaje:'Lista de Productos',
        productos
    })
})

app.listen(PORT, (err) => {
    if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


