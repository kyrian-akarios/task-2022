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
app.use('/api/', require('./api/pupils'))
// app.use('/api/', require('./api/statements'))
// app.use('/api/', require('./api/data'))
// app.use('/api/', require('./api/schools'))
app.listen(3000, ()=>{
        console.log("Listening in on" + 3000)
})


