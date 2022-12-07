const http = require('http')

const data = JSON.stringify(
    {
        id: "4",
        name: "Calculadora Científica",
        description: "",
        code: 10542,
        thumbnail: "https://cdn1.iconfinder.com/data/icons/software-hardware/200/software-24-128.png",
        price: 555,
        stock: 50
    }
)

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/productos/4',
    method: 'PUT', 
    headers: {
        'Content-Type': 'application/json',
        'Content-length': data.length
    }
}

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.log(error)
})

req.write(data)
req.end()