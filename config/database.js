const mongoose = require('mongoose')
const { loginBO } = require('../controllers/loginBO.controller')
mongoose.set('strictQuery', true)
const connectDb = async() => {
    try {
        await mongoose.connect('mongodb+srv://irisattapp:Rythermbk98@cluster0.ei6elcy.mongodb.net/redeem_code')
        console.log("Connect database Redeem Code_SH -  Successfully")
        // loginBO()
    } catch (error) {
        console.log({
            status: 502,
            mess: "Bad Gateway",
            error: error
        })
    }
}

module.exports = connectDb