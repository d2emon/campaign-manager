import express from 'express';
import * as usersHandler from '../handlers/users.js';

const router = express.Router();

router.post('/register', usersHandler.registerUser);

router.post('/login', usersHandler.loginUser);

router.post('/logout', usersHandler.logoutUser);

router.post('/refresh-token', usersHandler.refreshToken);

export default router;
