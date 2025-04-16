import express from 'express';
import debug from 'debug';
import User from '../models/user.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      username,
    } = req.body;

    const user = await User.create({
      email,
      password,
      username,
    });

    const { accessToken, refreshToken } = await user.generateTokens(true);
    return res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });  
  }
});

router.post('/login', async (req, res) => {
  try {
    const {
      password,
      username,
    } = req.body;

    const user = await User.login(username, password);
    if (!user) {
      return res.status(401).json({
        error: 'Неверное имя пользователя или пароль',
      });
    }

    const { accessToken, refreshToken } = await user.generateTokens(true);
    return res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await User.updateOne(
      { 'refreshTokens.token': refreshToken },
      { $pull: { refreshTokens: { token: refreshToken } } },
    );

    return res.status(204).end();
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ error: 'Недействительный токен!' });
    }
  
    const tokenData = user.refreshTokens.find(t => t.token === refreshToken);
    if (new Date(tokenData.expiresAt) < new Date()) {
      await User.updateOne(
        { id: user.id },
        { $pull: { refreshTokens: { token: refreshToken } } },
      );
      return res.status(403).json({
        error: 'Токен истек!',
      });
    }

    const tokens = await user.generateTokens(false);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 );
    await User.updateOne(
      { id: user.id },
      {
        $pull: { refreshTokens: { token: refreshToken } },
        $push: { refreshTokens: { token: tokens.refreshToken, expiresAt } },
      },
    );

    return res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    })
  } catch(error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    console.error(error);  
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get('/validation', authMiddleware, (req, res, next) => {
  try {
    const { user } = req;
    if (user) {
      return res.json({
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      });
    } else {
      return res.status(401).send('Error!');
    }
  } catch (error) {
    debug(`${process.env.APP_NAME}:users:error`)(`Error: ${error}`);
    return res.status(401).send('Error!');
  }
});

export default router;
