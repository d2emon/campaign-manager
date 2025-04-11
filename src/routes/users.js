const express = require('express');
const debug = require('debug')('campaign-manager:users');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/generateToken', function(req, res, next) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY
  const data = {
    time: Date(),
    userId: 12,
  }
  const token = jwt.sign(data, jwtSecretKey)
  res.send(token);
});

router.get('/validation', function(req, res, next) {
  const tokenHeaderKey = process.env.TOKEN_HEADER_KEY
  const jwtSecretKey = process.env.JWT_SECRET_KEY

  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send('Verified!');
    } else {
      return res.status(401).send('Error!');
    }
  } catch (error) {
    debug(`Error: ${error}`);
    return res.status(401).send('Error!');
  }
});

module.exports = router;
