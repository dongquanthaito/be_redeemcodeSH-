const express = require('express')
const { findCodeClient } = require('../controllers/promoCode.controller')
const Router = express.Router()

Router.route('/').get(findCodeClient)

module.exports = Router