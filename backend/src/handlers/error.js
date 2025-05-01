import debug from '../helpers/debug.js';
import config from '../helpers/config.js';

export const error404 = (req, res) => res.status(404).send({
  error: 'Page not found!',
});

export const logError = (err, req, res, next) => {
  debug('error')(`Error: ${err}`);
  console.error(err.stack);
  return next(err);
};

export const defaultError = (err, req, res, next) => {
  const response = {
    error: 'Server error!',
  };
  if (config.NODE_ENV !== 'production') {
    response.errorDetails = `${err}`;
  }
  return res.status(500).json(response);
};
  