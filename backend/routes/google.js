var express = require('express');
var router = express.Router();

router.get('/oauth', function(req, res, next) {
  // console.log(req.body.accessToken);
  res.sendStatus(200);
});

module.exports = router;
