const dotenv = require('dotenv').config() // 1

var twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

const client = twilio(accountSid, authToken)

const sms = async (mailOptions) => {
   try {
      const message = await client.messages.create(mailOptions)
      console.log(message)
   } catch (error) {
      console.log(error)
   }
}

function smsSendOrder(phone) {
   
   try {
      const smsOptions = {
         body: 'Orden en proceso!',
         from: process.env.PHONE_SMS_FROM,
         to: phone
      }
      sms(smsOptions)
 
   } catch (error) {
    logger.log('error', `Enviar WSP:  ${error}`);
   }
 }


module.exports = {sms, smsSendOrder }