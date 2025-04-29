import { verifyToken } from '../helpers/token.js';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен отсутствует!' });
  }
  
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded?.userId);

    if (!user) {
      return res.status(401).json({ error: 'Пользователь не найден!' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Недействительный токен!' });
  }
};

export default authMiddleware;
