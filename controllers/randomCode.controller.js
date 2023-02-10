const axios = require('axios');

module.exports = {
    randomCode: (req, res) => {
        let {...query} = req.query

        function getRandom(code_length) {
            let codeLength = code_length
        
            let code_string = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < codeLength) {
                code_string += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return code_string
        }
        
        let codeBox = []
        let code_length = query.code_length
        let list_code_length = query.list_code_length
        let date_code = query.date_code
        let site = query.site
        let point = query.point
        let user_used = query.user_used
        
        for(i = 0; i < list_code_length; i++) {
            codeBox.push({date_code: date_code, site: site, promo_code: getRandom(code_length), point: point, user_used: user_used})
        }

        let data = JSON.stringify(codeBox);
          
          let config = {
            method: 'post',
            url: 'http://localhost:5000/code',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            if(response.data.insertedCount > 0) {
              res.json({
                valid: true,
                codCount: codeBox.length,
                mess: "Thêm code thành công"
              })
            } else {
              res.json({
                valid: false,
                codCount: codeBox.length,
                mess: "Rỗng"
              })
            }
            
          })
          .catch(function (error) {
            res.json(error)
            console.log(error);
          }); 
        
    }
}