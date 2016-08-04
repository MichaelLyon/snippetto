var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request');
var request = require('request');



  router.post('/getWeather', function(req, res, next) {
    var weatherAPIKey = 'c98ec93f5a134adb4a37ca10c015d4e5';
    var long = req.body.lng
    var lat = req.body.lat
    request(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=c98ec93f5a134adb4a37ca10c015d4e5`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
       var obj = JSON.parse(body)
       var arr = obj
       var cityName = obj.name;
       var degrees = Math.ceil(arr.main.temp)+'°'
       var weather = arr.weather[0].description
       var dateAndWeather = []
       dateAndWeather.push(cityName+": "+ weather + " " + degrees)
      //  console.log(dateAndWeather);
       res.send(body);
      }
    })
  });

  module.exports = router;
