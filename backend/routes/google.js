var express = require('express');
var router = express.Router();
var request = require('request')
var Users = require('../lib/queries')


router.post('/oauth', function(req, res, next) {
  request(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${req.body.accessToken}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })

});


router.post('/new', function(req, res, next) {
  Users.checkForExistingUser(req.body.username).then(function(user) {
    if (user.rows[0]) {
      res.send(user.rows[0].username)
    } else {
      Users.createNewUser(req.body.username).then(function() {
        res.send(req.body.username + ' newUser')
      })
    }
  })


});





module.exports = router;
