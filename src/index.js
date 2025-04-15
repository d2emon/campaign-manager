#!/usr/bin/env node

/**
 * Module dependencies.
 */
import Debug from 'debug';
import http from 'http';
import app from './app.js';
import normalizePort from './helpers/normalizePort.js';

const debug = Debug(`${process.env.APP_NAME}:server`);

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

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
  debug('Listening on ' + bind);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, onListening);
server.on('error', onError);
// server.on('listening', onListening);
