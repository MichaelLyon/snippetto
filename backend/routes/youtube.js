var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request');
var request = require('request');



  router.get('/getTopVideos', function(req, res, next) {
    request('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=24&maxResults=10&key=AIzaSyAsA8OyLKjlemMUgQYPM5HWxt8pr88JHzw', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body))
      }
    })
  });

  module.exports = router;
