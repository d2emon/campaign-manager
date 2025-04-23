import User from '../models/user.js';

export const registerUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      role,
      username,
    } = req.body;

    const duplicates = await User.countDocuments({
      $or: [
        { username },
        { email },
      ],
    });
    if (duplicates > 0) {
      return res.status(400).json({
        error: 'Пользователь с таким именем или адресом электронной почты уже существует!',
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
  } catch (err) {
    return next(err);
  }
};

export const validateUser = async (req, res, next) => {
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
  } catch (err) {
    return next(err);
  }
};
