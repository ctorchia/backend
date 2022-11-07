var nodemailer = require('nodemailer');

const TEST_MAIL = 'nodemailer.cmt@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'szamfeificsbkrcf'
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
