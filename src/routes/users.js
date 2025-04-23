import express from 'express';
import * as usersHandler from '../handlers/users.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', usersHandler.registerUser);

router.post('/login', usersHandler.loginUser);

router.post('/logout', usersHandler.logoutUser);

router.post('/refresh-token', usersHandler.refreshToken);

router.get('/validation', authMiddleware, usersHandler.validateUser);

export default router;
