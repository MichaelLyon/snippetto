var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request')
var request = require('request')


router.post('/oauth', function(req, res, next) {
  console.log(req.body.accessToken);
  console.log('STARTING HTTP REQUEST');
  request('https://api.spotify.com/v1/search?q=higher%20love&type=track&market=US', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })

});

module.exports = router;
