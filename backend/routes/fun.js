var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request');
var request = require('request');



  router.get('/getFun', function(req, res, next) {
    request("http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en", function (error, response, body) {
      if (!error && response.statusCode == 200) {
       res.send(body);
      }
    })
  });

  router.post('/getFunny', function(req, res, next) {

    request(`http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en`, function (error, response, body) {

      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    })
  });

  module.exports = router;
