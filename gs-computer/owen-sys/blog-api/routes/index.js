var express = require('express');
var router = express.Router();
var test = require('../controller/test')

/* GET home page. */
router.get('/', test.home);

module.exports = router;
