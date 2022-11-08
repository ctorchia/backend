const dotenv = require('dotenv').config() // 1

var twilio = require('twilio')

const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

const client = twilio(accountSid, authToken)

const whatsapp = async (mailOptions) => {
   try {
      const message = await client.messages.create(mailOptions)
      console.log(message)
   } catch (error) {
      console.log(error)
   }
}

module.exports = whatsapp