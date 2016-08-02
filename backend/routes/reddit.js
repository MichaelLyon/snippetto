var express = require('express');
var router = express.Router();

router.post('/oauth', function(req, res, next) {
  console.log(req.body.accessToken);
});

module.exports = router;
