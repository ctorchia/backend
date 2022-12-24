const dotenv = require('dotenv').config() // 1

var twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

const client = twilio(accountSid, authToken)

const whatsapp = async (mailOptions) => {
   try {
      const message = await client.messages.create(mailOptions)
      logger.info(message)
   } catch (error) {
      logger.error(error)
   }
}

function whatsappSendOrder(username, email) {
   
   try {
      const whatsappSendOrderOptions = {
         body: `Nueva Orden de Compra de ${username}, su email es: ${email}`,
         // mediaUrl: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Twilio-logo-red.svg/2560px-Twilio-logo-red.svg.png'],
         from: process.env.PHONE_WHATSAPP_FROM,
         to: process.env.PHONE_WHATSAPP_TO
      }
     
     whatsapp(whatsappSendOrderOptions)
 
   } catch (error) {
    logger.log('error', `Enviar WSP:  ${error}`);
   }
 }

module.exports = {whatsapp, whatsappSendOrder}