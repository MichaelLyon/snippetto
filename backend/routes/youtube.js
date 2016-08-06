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
    Youtube.addVideo(req.body.user_id, req.body.videoId, req.body.videoTitle).then(function() {
      res.sendStatus(200)
    })
  });


  router.get('/getFavorites', function(req, res, next) {
    Youtube.getFavoritedRank().then(function(favoritedRank) {
      res.json(favoritedRank.rows)
    })
  });

  router.get('/getVideoFavoriteUsers/:videoId', function(req, res, next) {
    Youtube.getVideoFavoriteUsers(req.params.videoId).then(function(users) {
      res.json(users.rows)
    })
  });











  module.exports = router;
