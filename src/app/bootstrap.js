/**
 * @server - Server for the application
 * @description - server set up goes here
 */

const express = require('express')
const app = express()
const env = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
env.config()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/', require('./routes/homepage'))
app.use('/dashboard', require('./routes/dashboard'))
app.use('/report', require('./routes/report'))


app.listen(3000, ()=>{
    console.log("Listeing in on" + 3000)
})