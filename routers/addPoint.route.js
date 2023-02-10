const express = require('express')
const { shbet } = require('../controllers/addpoint.controller')
const Router = express.Router()

Router.route('/shbet').get(shbet)

module.exports = Router
