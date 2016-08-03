var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request');
var request = require('request');



  router.get('/getWeather', function(req, res, next) {
    var weatherAPIKey = 'c98ec93f5a134adb4a37ca10c015d4e5';
    var city_id=5419384;
    // req.body.city_id
    console.log('STARTING HTTP REQUEST');
    request("http://api.openweathermap.org/data/2.5/forecast?id=5419384&APPID=c98ec93f5a134adb4a37ca10c015d4e5", function (error, response, body) {
      if (!error && response.statusCode == 200) {

       var x = body
       console.log('city: ', x);

       res.send(body);
      }
    })
  });

  module.exports = router;
