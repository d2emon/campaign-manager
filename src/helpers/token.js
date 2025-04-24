import jwt from 'jsonwebtoken';
import config from './config.js';

console.log('token', config.JWT_SECRET_KEY);

export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    config.JWT_SECRET_KEY,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES },
  );
};

export const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    config.JWT_SECRET_KEY,
    { expiresIn: config.REFRESH_TOKEN_EXPIRES },
  );
};
  
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};
