const codePromo = require('./codePromo.route')
const addPoint = require('./addPoint.route')
const getTokenBO = require('./getTokenBO.route')
const account = require('./account.route')
const randomCode = require('./randomCode.route')

module.exports = (app) => {{
    app.use('/code', codePromo)
    app.use('/add-point', addPoint)
    app.use('/get-token-bo', getTokenBO)
    app.use('/account', account)
    app.use('/generate-code', randomCode)
}}