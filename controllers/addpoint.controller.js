const axios = require('axios');
const tokenBOModel = require('../models/tokenBO.model');

module.exports = {
    shbet: async (req, res)=>{
        let config = {
            method: 'get',
            url: 'https://api.shbet.ski/get-token-bo',
        };
          
        axios(config)
        .then(function (response) {
            return response.data
        })
        .then(function (result) {
            let {...body} = req.body
            try {
                let data = {
                    "AccountsString": body.AccountsString,
                    "Amount": body.Amount,
                    "AmountString": body.Amount,
                    "Audit": body.Audit,
                    "AuditType": "Discount",
                    "DepositToken": body.DepositToken,
                    "IsReal": false,
                    "Memo": body.Memo,
                    "Password": "123456",
                    "PortalMemo": body.PortalMemo,
                    "TimeStamp": body.TimeStamp,
                    "Type": 5
                }
                    let config = {
                    method: 'post',
                    url: 'https://management.cdn-dysxb.com/Member/DepositSubmit',
                    headers: { 
                        'authorization': 'Bearer ' + result.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' http://gnl.jdtmb.com', 
                        'referer': ' http://gnl.jdtmb.com/', 
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                    };
                    
                    axios(config)
                    .then(function (response) {
                        res.json(response.data)
                    })
                    .catch(function (error) {
                        res.json(error);
                    });        
            } catch (error) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            }
        })
        .catch(function (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        });
    }, 
    shbetClient: async (player_id, point, deposit, memo, round)=>{
        let getToken = await tokenBOModel.findOne({Account: 'vinit'}).exec()
        if(getToken) {
            try {
                let data = {
                    "AccountsString": player_id,
                    "Amount": point,
                    "AmountString": point,
                    "Audit": point * round,
                    "AuditType": "Discount",
                    "DepositToken": deposit,
                    "IsReal": false,
                    "Memo": memo,
                    "Password": "123456",
                    "PortalMemo": memo,
                    "TimeStamp": new Date().getTime,
                    "Type": 5
                }
                    let config = {
                    method: 'post',
                    url: 'https://management.cdn-dysxb.com/Member/DepositSubmit',
                    headers: { 
                        'authorization': 'Bearer ' + getToken.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' http://gnl.jdtmb.com', 
                        'referer': ' http://gnl.jdtmb.com/', 
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                    };
                    
                    return axios(config)
                    .then(function (response) {
                        return response.data
                    })
                    .catch(function (error) {
                        return 502
                    });        
            } catch (error) {
                return 502
            }
        } else {
            return 502
        }
        
    }
}