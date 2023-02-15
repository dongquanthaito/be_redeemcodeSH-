const axios = require('axios');

module.exports = {
    getMemberBO: async (req, res) => {
        let config = {
            method: 'get',
            url: 'http://localhost:5000/get-token-bo',
        };
          
        axios(config)
        .then(function (response) {
            return response.data
        })
        .then(function (result) {
            let {...query} = req.query
            try {
                let option = {
                    method: 'get',
                    // maxBodyLength: Infinity,
                    url: 'https://management.cdn-dysxb.com/Member/GetMemberSuggestion?query='+query.player_id,
                    headers: { 
                      'authorization': 'Bearer ' + result.Token, 
                      'content-type': ' application/json;charset=utf-8', 
                      'origin': ' http://gnl.jdtmb.com', 
                      'referer': ' http://gnl.jdtmb.com/', 
                      'x-requested-with': ' XMLHttpRequest'
                    }
                  };
                  
                  axios(option)
                  .then(function (response) {
                    let playerID = 'non'
                    response.data.forEach((el) => {
                        if(el.Account == query.player_id) {
                            playerID = query.player_id
                        } else if(el.Account != query.player_id) {
                            playerID
                        }
                    })
                    if(playerID == 'non') {
                        res.json({
                            statusCode: 404,
                            valid: false,
                            mess: 'Không tìm thấy thấy tài khoản hoặc tài khoản bị sai. Vui lòng thử lại.',
                            account: query.player_id
                        })
                    } else {
                        res.json({
                            statusCode: 200,
                            valid: true,
                            account: query.player_id
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
        .catch(function (error) {
            res.json({
                code: 502,
                mess: "Bad Gateway",
                err: error
            })
        });
    }
}