const express = require('express')
const app = express()
const Fingerprint = require('express-fingerprint')

module.exports = {
    getClientIPFP: async(req, res) => {
        try {
            app.use(Fingerprint({
                parameters:[
                    Fingerprint.useragent,
                    Fingerprint.acceptHeaders,
                    Fingerprint.geoip,
                ]
            }))
            
            res.json({
                status_code: 200,
                valid: true,
                ip: req.ip,
                fp: req.fingerprint.hash
            });
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    }
}