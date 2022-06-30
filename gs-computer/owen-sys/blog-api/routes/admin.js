var express = require('express');
var router = express.Router();
var authorized = require('../controller/authorized')

router.get('/login', authorized.adminLogin);
router.get('/register', authorized.adminRegister);

module.exports = router;
