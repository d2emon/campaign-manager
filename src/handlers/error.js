import debug from 'debug';

export const error404 = (req, res) => res.status(404).send({
  error: 'Page not found!',
});

export const logError = (err, req, res, next) => {
  debug(`${process.env.APP_NAME}:error`)(`Error: ${err}`);
  console.error(err.stack);
  return next(err);
};

export const defaultError = (err, req, res, next) => {
  return res.status(500).json({
    error: 'Server error!',
  });
};
  