var express = require('express');
var router = express.Router();
var request = require('request')
var News = require('../lib/queries')


router.post('/setPreferences', function(req, res, next) {
  var user_id = req.body.user_id
  var array = Object.keys(req.body)
  array.splice(array.indexOf('user_id'), 1)
  var asyncArray = News.createArrayForAsync(req.body.user_id, array)
  News.series(asyncArray)
  res.sendStatus(200)
});


module.exports = router;
