import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', async function(req, res, next) {
  try {
    const {
      email,
      password,
      username,
    } = req.body;

    const newUser = new User({
      email,
      password,
      username,
    });
    const result = await newUser.save();
    res.send({
      result: true,
    });  
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    res.send({
      result: false,
      error: error.message,
    });  
  }
});

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
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    return res.status(401).send('Error!');
  }
});

export default router;
