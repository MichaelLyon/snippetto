var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request')
var request = require('request')

router.post('/subredditList', function(req, res, next) {
    request('https://www.reddit.com/reddits.json?limit=50&after=t3_10omtd/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    })
});

router.post('/subreddit/:subRedditName', function(req, res, next) {
    console.log(req.params.subRedditName);
    request(`https://www.reddit.com/r/${req.params.subRedditName}/top/.json`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    })
});


module.exports = router;
