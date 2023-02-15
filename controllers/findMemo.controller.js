const axios = require('axios');

module.exports = {
    findMemo: (req, res) => {
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
                    "pageInfo": {
                        "count": 1000,
                        "index": 0
                    },
                    "search": {
                    "Account": body.Account,
                    "agSearchType": 0,
                    "TimeBegin": body.TimeBegin,
                    "Types": [
                        "Bonus"
                    ]
                    }
                }
               
                let option = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/api/1.0/transactions/query',
                    headers: { 
                        'authorization': 'Bearer '+ result.Token, 
                        'content-type': ' application/json;charset=utf-8', 
                        'origin': ' http://gnl.jdtmb.com', 
                        'referer': ' http://gnl.jdtmb.com/', 
                        'x-requested-with': ' XMLHttpRequest'
                    },
                    data : data
                };
                
                axios(option)
                .then(function (response) {
                    let boxMemo = []
                    response.data.Result.Records.forEach((el) => {
                        if(el.Memo == body.Memo) {
                            boxMemo.push(el.Memo)
                        }
                    })
                    if(boxMemo.includes(body.Memo)) {
                        res.json({
                            code: 200,
                            valid: false,
                            mess: "Đã nhận khuyến mãi."
                        })
                    } else {
                        res.json({
                            code: 404,
                            valid: true,
                            mess: "Chưa nhận khuyến mãi."
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
            } catch (error) {
                res.json({
                    code: 502,
                    mess: "Bad Gateway",
                    err: error
                })
            }
        })
        
    }
}