const gmMiddleware = async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ error: 'Пользователь не найден!' });
  }

  if (user.role !== 'gm') {
    return res.status(403).json({ error: 'У пользователя недостаточно прав!' });
  }

  return next();
};

export default gmMiddleware;
