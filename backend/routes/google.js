var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request')

router.post('/oauth', function(req, res, next) {
  console.log(req.body.accessToken);
  httpRequest.get('https://api.spotify.com/v1/search?q=higher%20love&type=track&market=US', function(request) {
    console.log(request);
  })
  res.sendStatus(200);
});

module.exports = router;
