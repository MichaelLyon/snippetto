var express = require('express');
var router = express.Router();
var request = require('request')
var News = require('../lib/queries')


router.post('/setPreferences', function(req, res, next) {
    var user_id = req.body.user_id
    News.resetUserPrefs(user_id).then(function() {
      var array = Object.keys(req.body)
      array.unshift('home')
      array.splice(array.indexOf('user_id'), 1)
      var asyncArray = News.createArrayForAsync(req.body.user_id, array)
      News.series(asyncArray)
      res.sendStatus(200)
    })
});


router.post('/getPreferences', function(req, res, next) {
  News.getNewsPreferences(req.body.user_id).then(function(prefs) {
    if (prefs.rows[0]) {
      res.json({
        preferences: prefs.rows
      })
    } else {
      res.json({
        noPreferences: true
      })
    }
  })
});

router.post('/save', function(req, res, next) {
  console.log(req.body);
});




module.exports = router;
