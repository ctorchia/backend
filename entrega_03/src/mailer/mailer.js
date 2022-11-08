const dotenv = require('dotenv').config() // 1

var nodemailer = require('nodemailer');
const NODEMAILER_PASS = process.env.NODEMAILER_PASS
const NODEMAILER_MAIL = process.env.NODEMAILER_MAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: NODEMAILER_MAIL,
        pass: NODEMAILER_PASS
    }
 });

// const mailOptions = {
//     from: 'Servidor Node.js',
//     to: 'cristian_torchia@yahoo.com.ar',
//     subject: 'Logo de MercadoPago',
//     html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
//     attachments: [
//         {
//             path:'https://tuquejasuma.com/media/images/thumbnails/2121664_mercado_pago_no_me_deja_abrir_mi_mercado_pago.jpg'
//         }
//     ]
// }

// ;(async () => {
//     try {
//         const info = await transporter.sendMail(mailOptions)
//         console.log(info)
//     } catch (error) {
//         console.log(error)
//     }
// })()

const mailer = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

module.exports = mailer
