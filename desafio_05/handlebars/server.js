const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
app.use(express.urlencoded({ extended: true }))

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

const list = [
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
    let listExist
    (list.length> 0)? listExist=true: listExist=false
    res.render('main', {
        listExist,
        mensaje:'Lista de Productos',
        list
    })
})

app.post('/productos', (req, res) => {
    const obj = req.body
    console.log(obj)
    list.push(obj)
    res.render('main', {
        listExist:true,
        list
    })
})