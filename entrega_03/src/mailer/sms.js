// import twilio from 'twilio'
var twilio = require('twilio')

const accountSid = 'AC0c9d4157bd39c08da24002d242b01acc'
const authToken = 'a33f588b6a0ca89d6fe7f98f5b622384'

const client = twilio(accountSid, authToken)

;(async () => {
    try {
   const message = await client.messages.create({
      body: 'Probando SMS!!',
      from: '+12183163277',
      to: '+5491162660189'
   })
   console.log(message)
} catch (error) {
   console.log(error)
}
})()
