import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ACCESS_TOKEN_EXPIRES = '15m';
const REFRESH_TOKEN_EXPIRES = '7d';

export const generateAccessToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    JWT_SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXPIRES },
  );
};

export const generateRefreshToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    JWT_SECRET_KEY,
    { expiresIn: REFRESH_TOKEN_EXPIRES },
  );
};
  
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};
