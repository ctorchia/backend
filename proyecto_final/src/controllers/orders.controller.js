// const { response } = require('express')

const {mailerSendOrder} = require('../mailer/mailer')
// const {whatsappSendOrder} = require('../mailer/whatsapp')
// const {smsSendOrder} = require('../mailer/sms')

const {ordersDao, carritosDao} = require("../daos/index");
const order = ordersDao
const carrito = carritosDao

const administrador = true

//********************** GET (Devuelve todas las ordenes) **********************************
const getOrders = async (req, res) => {
    const orderList = await order.getAll()
    res.json(orderList)
}

//********************** GET (Devuelve una orden según ID) **********************************
const getOrderById = async (req, res) => {
    const { id } = req.params
    const orderById = await order.getById(id)
    orderById ?
        res.json(orderById)
        :
        res.json({ error: 'Producto no encontrado' })
}

//********************** POST: '/sendOrder' (Confirmar Compra) **********************************

const postSendOrder = async (req, res) => {
    const { idCart, email } = req.body
    const carritoById = await carrito.getById(idCart)
    listaProductos = carritoById.products
    console.log("viene en body",email);
    const idOrder = await order.sendOrder(listaProductos, email)

    // Enviar correo por envio de orden
    // mailerSendOrder(listaProductos, username, email);
    // whatsappSendOrder(username, email);
    // smsSendOrder(phone)

    res.json({ mensaje: "Compra confirmada", productos: listaProductos, idOrder })
}

//************************ PUT (Recibe y Actualiza una orden según su ID) ***********************
const putOrder = async (req, res) => {
    if (administrador) {
        const { id } = req.params
        const result = await order.updateById(id, req.body)
        res.json(result)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/orders/id, Método PUT, No autorizado"
        })
    }
}

//************************ DELETE (Elimina una orden según su ID) ***********************
const deleteOrderById = async (req, res) => {
    if (administrador) {
        const { id } = req.params
        await order.deleteById(id)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/orders/id, Método DELETE, No autorizado"
        })
    }
}

//********************** '*' Rest of the routes **********************************
const routeNotAvailable = async (req, res) => {
    res.json({
        error: -2,
        description: "Ruta no implementada"
    })
}

module.exports = {
    getOrders,
    getOrderById,
    postSendOrder,
    putOrder,
    deleteOrderById,
    routeNotAvailable
}