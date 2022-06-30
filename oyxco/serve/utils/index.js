const util = require('util');
const jsonwebtoken = require('jsonwebtoken')
const config = require('../config/index')

const jwtPayload = async (header) => {
  if (!header || !header.authorization) {
    return {}
  }
  const token = header.authorization.split(' ')[1]
  if (!token) {
    return {}
  }
  const payload = await util.promisify(jsonwebtoken.verify)(token, config.SECRET);
  return payload
}

module.exports = {
  jwtPayload
}