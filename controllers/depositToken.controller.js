const axios = require('axios');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    getDepositToken: async(req, res) => {
        let config = {
            method: 'get',
            url: 'https://api.shbet.ski/get-token-bo',
        };
          
        axios(config)
        .then(function (response) {
            return response.data
        })
        .then(function (result) {
            try {
                let option = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/Member/DepositToken',
                    headers: { 
                      'authorization': 'Bearer ' + result.Token, 
                      'content-type': ' application/json;charset=utf-8', 
                      'origin': ' http://gnl.jdtmb.com', 
                      'referer': ' http://gnl.jdtmb.com/', 
                      'x-requested-with': ' XMLHttpRequest'
                    },
                };
                
                axios(option)
                .then(function (response) {
                    res.json({
                        valid: true,
                        detail: response.data
                    })
                })
                .catch(function (error) {
                    res.json({
                        code: 502,
                        mess: "Bad Gateway",
                        err: error
                    })
                });
            } catch (error) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            }
        })
    },

    getDepositTokenClient: async(req, res) => {
        let getToken = await tokenBOModel.findOne({Account: 'vinit'}).exec()
        if(getToken) {
            try {
                let option = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/Member/DepositToken',
                    headers: { 
                      'authorization': 'Bearer ' + getToken.Token, 
                      'content-type': ' application/json;charset=utf-8', 
                      'origin': ' http://gnl.jdtmb.com', 
                      'referer': ' http://gnl.jdtmb.com/', 
                      'x-requested-with': ' XMLHttpRequest'
                    },
                };
                
                return axios(option)
                .then(function (response) {
                    return response.data
                })
                .catch(function (error) {
                    return 502
                });
            } catch (error) {
                return 502
            }
        }
        

    }
}