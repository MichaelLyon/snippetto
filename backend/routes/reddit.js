var express = require('express');
var router = express.Router();

router.post('/oauth', function(req, res, next) {
});

router.get('/', function(req,res,next){
  res.cookie('cookie', 'yeah');
})

module.exports = router;
