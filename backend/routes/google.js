var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request')
var request = require('request')


router.post('/oauth', function(req, res, next) {
  console.log(req.body.accessToken);
  console.log('STARTING HTTP REQUEST');
  request(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${req.body.accessToken}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })

});

module.exports = router;
