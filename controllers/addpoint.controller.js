const axios = require('axios');

module.exports = {
    shbet: async (req, res)=>{
        let config = {
            method: 'get',
            url: 'http://localhost:5000/get-token-bo',
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
                    "AmountString": body.AmountString,
                    "Audit": body.Audit,
                    "AuditType": body.AuditType,
                    "DepositToken": body.DepositToken,
                    "IsReal": body.IsReal,
                    "Memo": body.Memo,
                    "Password": "123456",
                    "PortalMemo": body.PortalMemo,
                    "TimeStamp": body.TimeStamp,
                    "Type": body.Type
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
                res.json(error)
            }
        })
        .catch(function (error) {
        res.json(error);
        });
    }
}