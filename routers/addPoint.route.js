const express = require('express')
const { shbet } = require('../controllers/addpoint.controller')
const Router = express.Router()

Router.route('/shbet').post(shbet)

module.exports = Router
