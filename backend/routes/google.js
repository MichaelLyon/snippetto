var express = require('express');
var router = express.Router();

router.get('/oauth', function(req, res, next) {
  console.log('oauth route hit');
});

module.exports = router;
