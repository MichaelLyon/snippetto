var express = require('express');
var router = express.Router();
var request = require('request')
var News = require('../lib/queries')


router.post('/setPreferences', function(req, res, next) {
  console.log('***************');
  var asyncArray = News.createArrayForAsync(2, Object.keys(req.body))
  News.series(asyncArray)
  res.sendStatus(200)
});


module.exports = router;
