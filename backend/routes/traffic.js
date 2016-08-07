var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request')
var request = require('request')
var Traffic = require('../lib/queries')

router.post('/setAddress', function(req, res, next) {
    Traffic.selectUser(req.body.id).then(function(condition) {
        if (condition.rowCount != 0) {
            Traffic.updateAddress(req.body).then(function() {
              console.log('updated');
                res.send('updated');
            });
        } else {
            Traffic.saveAddress(req.body).then(function() {
              console.log('saved');
                res.send('saved');
            });
        }
    })
});

router.post('/', function(req, res, next) {
  Traffic.checkForExistingUser()
    Traffic.selectUser(req.body.userId).then(function(destinationAddress) {
        var originCleanUp = [req.body.origin1.lat, req.body.origin1.lng];
        var street = destinationAddress.rows[0].street.replace(/\s+/g, '+');
        var city = destinationAddress.rows[0].city.replace(/\s+/g, '+');
        var state = destinationAddress.rows[0].state;
        var address = street + ',' + '+' + city + ',' + '+' + state;
        var sendBackObject = {};

        request('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCx0Ga7DUSfnNyk8Am0sipc2lJ1EFTHIg0', function(error, response, body1) {
            var parsedBody = JSON.parse(body1);
            var destinationCordsString = String(parsedBody.results[0].geometry.location.lat + ',' + parsedBody.results[0].geometry.location.lng);
            request(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originCleanUp}&destinations=${address}&departure_time=${req.body.currentTime.toFixed(0)+100}&traffic_model&key=AIzaSyCx0Ga7DUSfnNyk8Am0sipc2lJ1EFTHIg0`, function(error, response, body2) {
                var parsedTheSequel = JSON.parse(body2);
                sendBackObject.destinationCords = destinationCordsString;
                sendBackObject.durationInTraffic = parsedTheSequel.rows[0].elements[0].duration_in_traffic;
                res.send(sendBackObject);
            })
        })
    })
});


router.post('/getAdd', function(req, res, next) {
    console.log(req.body.id);
    Traffic.selectUser(req.body.id).then(function() {

    })
});

module.exports = router;
