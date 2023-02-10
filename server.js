const express = require('express')
const connectDb = require('./config/database')
const bodyParser = require('body-parser')
const Router = require('./routers')
const app = express()
const cors = require('cors')

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors())

connectDb()
Router(app)

app.get('/test',(req,res,next)=>{
    res.send("Test được rồi nè")
})

app.listen('5000', ()=> console.log("Server working in port 5000"))