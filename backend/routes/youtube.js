var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request');
var request = require('request');
var Youtube = require('../lib/queries')



  router.get('/getTopVideos', function(req, res, next) {
    request('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=24&maxResults=10&key=AIzaSyAsA8OyLKjlemMUgQYPM5HWxt8pr88JHzw', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body))
      }
    })
  });

  module.exports = router;


  router.post('/search', function(req, res, next) {
    request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${req.body.searchString}&maxResults=6&key=AIzaSyAsA8OyLKjlemMUgQYPM5HWxt8pr88JHzw`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body))
      }
    })
  });


  router.post('/addToFavorites', function(req, res, next) {
    console.log(req.body);
    Youtube.addVideo(req.body.user_id, req.body.videoId).then(function() {
      res.sendStatus(200)
    })
  });




  module.exports = router;
