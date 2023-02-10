const mongoose = require('mongoose')

const promoCode = mongoose.Schema({
    date_code: String,
    site: String,
    promo_code: String,
    point: String,
    user_used: String,
})

module.exports = mongoose.model('promoCode', promoCode)