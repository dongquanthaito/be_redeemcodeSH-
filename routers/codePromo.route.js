const express = require('express')
const Router = express.Router()

const role = require('../middlewares/role.middleware')
const roleType =require('../const/role')
const auth = require('../middlewares/auth.middleware')

const { findPromoCode, postPromoCode, deletePromoCode, updateCode } = require('../controllers/promoCode.controller')

Router.route('/').get(auth, role([roleType.SUPERADMIN, roleType.ADMIN]), findPromoCode)
Router.route('/').post(postPromoCode)
Router.route('/').delete(auth, role([roleType.SUPERADMIN, roleType.ADMIN]), deletePromoCode)
Router.route('/').patch(updateCode)

module.exports = Router