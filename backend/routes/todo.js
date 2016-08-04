var express = require('express');
var router = express.Router();
var request = require('request')
var Todo = require('../lib/queries')


router.post('/new', function(req, res, next) {
  console.log(req.body);

});



module.exports = router;
