var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request');
var request = require('request');



  router.get('/getFun', function(req, res, next) {
    request("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=", function (error, response, body) {
      if (!error && response.statusCode == 200) {

       res.send(body);
      }
    })
  });

  router.post('/getFunny', function(req, res, next) {

    request(`http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback`, function (error, response, body) {

      if (!error && response.statusCode == 200) {
        res.send(body);
      }
    })
  });

  module.exports = router;
