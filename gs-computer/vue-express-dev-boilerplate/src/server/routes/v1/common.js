var express = require('express');
var router = express.Router();
import { insertUser, login } from '../../model/user.model'

/* GET home page. */
router.get('/v1/common', function(req, res, next) {
  res.send({
    code: 0
  })
});

router.post('/v1/user/add', function (req, res) {
  insertUser(req.body, function (resData) {
    res.send(resData)
  })
})

router.post('/v1/user/login', function (req, res) {
  login(req.body, function (resData) {
    res.send(resData)
  })
})

module.exports = router;