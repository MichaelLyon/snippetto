var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request')
var request = require('request')
var Traffic = require('../lib/queries')

router.post('/setAddress/:street/:city/:state/:zip', function(req, res, next) {
  console.log(req.body);
  Traffic.saveAddresses(req.params.street, req.parmas.city, req.params.state, req.params.zip).then(function(data){
    res.send(data);
  })
});

router.post('/getTraffic', function(req, res, next) {
  request('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Lonetree,CO&destinations=Denver,CO&key=AIzaSyCx0Ga7DUSfnNyk8Am0sipc2lJ1EFTHIg0', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  })

});

module.exports = router;
