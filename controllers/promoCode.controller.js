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
            if(find.length == 0) {
                res.json({
                    statusCode: 404,
                    valid: false,
                    mess: 'Not found'
                })
            } else {
                res.json({
                    statusCode: 200,
                    valid: true,
                    detail: find
                })
            }
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
            if(body.date_code) {
                try {
                    let update = await promoCodeModel.updateMany({date_code: body.date_code}, body)
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
            if(body.site) {
                try {
                    let update = await promoCodeModel.updateMany({site: body.site}, body)
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
            if(body.promo_code) {
                try {
                    let update = await promoCodeModel.updateMany({promo_code: body.promo_code}, body)
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
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
        
    },

    findCodeClient: async(req, res) => {
        let {...query} = req.query
        try {
            if(query.promo_code || query.user_used) {
                let find = await promoCodeModel.find(query)
                if(find.length == 0) {
                    res.json({
                        statusCode: 404,
                        valid: false,
                        mess: 'Not found'
                    })
                } else {
                    res.json({
                        statusCode: 200,
                        valid: true,
                        detail: [
                            {
                                promo_code: find[0].promo_code,
                                point: find[0].point,
                                user_used: find[0].user_used,
                                used_time: find[0].used_time,
                                exp_code: find[0].exp_code
                            }
                        ]
                    })
                }
            } else if(!query.promo_code || !query.user_used) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            }
        } catch (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        }
    },
}