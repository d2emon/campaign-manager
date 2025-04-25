#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';
import mongoose from 'mongoose';
import app from './app.js';
import config from './helpers/config.js';
import debug from './helpers/debug.js';
import normalizePort from './helpers/normalizePort.js';

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.PORT || '5000');
app.set('port', port);

mongoose.connect(`${config.MONGO_DATABASE}`)

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('server')('Listening on ' + bind);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, onListening);
server.on('error', onError);
// server.on('listening', onListening);
