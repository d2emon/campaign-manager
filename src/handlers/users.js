import User from '../models/user.js';

export const registerUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      role,
      username,
    } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email обязателен для заполнения',
      })
    }

    if (!password) {
      return res.status(400).json({
        error: 'Пароль обязателен для заполнения',
      })
    }

    if (!username) {
      return res.status(400).json({
        error: 'Имя пользователя обязательно для заполнения',
      })
    }

    const duplicates = await User.countDocuments({
      $or: [
        { username },
        { email },
      ],
    });
    if (duplicates > 0) {
      return res.status(400).json({
        error: 'Email или имя пользователя уже заняты',
      })
    }

    const user = await User.create({
      email,
      password,
      role,
      username,
    });      

    const { accessToken, refreshToken } = await user.generateTokens(true);
    return res.status(201).json({
      accessToken,
      refreshToken,
    });  
  } catch (err) {
    return next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const {
      password,
      username,
    } = req.body;

    // TODO: Use email to login

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
  } catch (err) {
    return next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    await User.updateOne(
      { 'refreshTokens.token': refreshToken },
      { $pull: { refreshTokens: { token: refreshToken } } },
    );

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const user = await User.findOne({ 'refreshTokens.token': refreshToken });
    if (!user) {
      return res.status(403).json({ error: 'Недействительный токен!' });
    }

    const tokenData = user.refreshTokens.find(t => t.token === refreshToken);
    await User.updateOne(
      { id: user.id },
      {
        $pull: { refreshTokens: { token: refreshToken } },
      },
    );

    if (new Date(tokenData.expiresAt) < new Date()) {
      return res.status(403).json({
        error: 'Токен истек!',
      });
    }

    const tokens = await user.generateTokens(false);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 );
    await User.updateOne(
      { id: user.id },
      {
        $push: { refreshTokens: { token: tokens.refreshToken, expiresAt } },
      },
    );

    return res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    })
  } catch (err) {
    return next(err);
  }
};
