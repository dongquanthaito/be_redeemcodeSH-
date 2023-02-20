const mongoose = require('mongoose')

const promoCode = mongoose.Schema({
    date_code: String,
    site: String,
    promo_id: String,
    promo_code: String,
    point: String,
    user_used: String,
    exp_code: Number,
    used_time: Number,
    ip: String,
    fp: String
})

module.exports = mongoose.model('promoCode', promoCode)