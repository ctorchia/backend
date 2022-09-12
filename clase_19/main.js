const express = require('express')
const dotenv = require('dotenv').config()
const { Router } = express
const Users = require('./models/users.models')
const connectDB = require('./mongoDB/connection')
const app = express()
const router = Router()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

router.get('/', async (req, res) => {

    try {
        
        // --------- Create new user ( Validate if user exists ) ----------------
        // let user = new Users(
        //     {
        //         name: 'John',
        //         email: 'john@example.com',
        //         password: '123456'
        //     }
        // )
        // await user.save()

        // ---------- Create some users --------------------------
        // console.log('Create 3 users');

        // new Users({name: 'Juan', email: 'juan@gmail.com', password: '123456'}).save()
        // new Users({name: 'Pablo', email: 'pablo@gmail.com', password: '234567'}).save()
        // new Users({name: 'Adrian', email: 'adrian@gmail.com', password: '345678'}).save()

        // --------- Update user --------------
        // await Users.updateOne({name: 'John'}, {$set: {password: '654321'}})
        // console.log('Usuario Actualizado');
        
        // --------- Delete user ----------------
        // await Users.deleteOne({name: 'John'})
        // console.log('Usuario Eliminado');
        
        // --------- Get users ----------------
        const users = await Users.find()
        console.log(users);

        // --------- Specifics Reads --------------------------------
        // console.log('READ PROJECTION + FILTER')
        // console.log(await Users.find({email: 'juan@gmail.com'},{name:1,email:1,_id:0}))
        // console.log(await Users.find({name: 'Pablo'},{name:1,email:1,_id:0}))

        // console.log('READ PROJECTION + SORT')
        // console.log(await Users.find({},{name:1,_id:0}).sort({name: -1}))

        // console.log('READ PROJECTION + SORT + SKIP')
        // console.log(await Users.find({},{name:1,_id:0}).sort({name: -1}).skip(1))

        // console.log('READ PROJECTION + SORT + SKIP + LIMIT')
        // console.log(await Users.find({},{name:1,_id:0}).sort({name: -1}).skip(1).limit(1))


        res.send('Hello World New!')

    } catch (error) {
        console.error(error)
    }
})

router.post('/', async (req, res) => {          // Validate if exists
    const { name, email, password } = req.body
    const user = new Users({ name, email, password })
    await user.save()
    res.send('User created successfully')
})

const validate=(req,res,next) => {
    console.log('validate')
    return next()
}


router.put('/', validate ,async (req, res) => {               // Move to controllers
    const { name, email, password } = req.body
    await Users.updateOne({name}, {$set:{email, password}})
    res.send('User updated')
})

app.use('/api/users', router)

// Listen on port 4000

app.listen(4000, () => {
    console.log('listening on port 4000')
})



