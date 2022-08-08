const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

app.set('view engine', 'pug')
app.set('views', './views')


app.get('/', (req, res) => {
    const {min,value,max,title} = req.query
    res.render('index', {min,value,max,title})
})

app.listen(PORT, (err) => {
    if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


