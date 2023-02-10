const promoCodeModel = require('../models/promoCode.model')

module.exports = {
    postPromoCode: async(req, res) => {
        try {
            let upload = await promoCodeModel.collection.insertMany(req.body)
            res.json(upload)
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    findPromoCode: async(req, res) => {
        let {...query} = req.query
        try {
            let find = await promoCodeModel.find(query)
            res.json(find)
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    deletePromoCode: async(req, res) => {
        let {...query} = req.query
        try {
            let del = await promoCodeModel.deleteMany(query)
            res.json(del)
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },

    updateCode: async(req, res)=>{
        let {...body} = req.body
        try {
            let update = await promoCodeModel.findOneAndUpdate({promo_code: body.promo_code}, body, {new: true})
            if(update) {
                res.json({
                    status_code: 200,
                    detail: update
                })
            } else {
                res.json({
                    status_code: 404,
                    mess: "Không tìm thấy tài khoản"
                })
            }
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    }
}