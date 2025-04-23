import debug from 'debug';
import config from './config.js';

const Debug = (key) => debug(`${config.APP_NAME}:${key}`);

export default Debug;
