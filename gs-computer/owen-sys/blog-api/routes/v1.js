var express = require('express');
var router = express.Router();
var authorized = require('../controller/authorized')

router.post('/login', authorized.login);
router.post('/register', authorized.register);

module.exports = router;
