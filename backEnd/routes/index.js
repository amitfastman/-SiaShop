var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });  //@@@ changed to ejs type from html or jade
});

module.exports = router;
