var express = require('express');
var router = express.Router();
var httpRequest = require('fd-http-request');
var request = require('request');



  router.get('/getQuote', function(req, res, next) {
    request("http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en", function (error, response, body) {
      if (!error && response.statusCode == 200) {
       res.send(body);
      }
    })
  });

  router.get('/getWord', function(req,res,next){
    request("http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function(error,response,body){
      res.send(JSON.parse(body));
    })
  })

  router.get('/getAdvice', function(req,res,next){
    request("http://api.adviceslip.com/advice", function(error,response,body){
      res.send(JSON.parse(body));
    })
  })

  router.get('/getChuck', function(req,res,next){
    request("https://api.chucknorris.io/jokes/random", function(error,response,body){
      res.send(JSON.parse(body));
    })
  })

  // router.get('/')

  module.exports = router;
