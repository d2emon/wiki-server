#!/usr/bin/env node
// import http from 'http';
// import Debug from 'debug';
// import config from './config';
// import { normalizePort } from './helpers';
import app from './app';
import messages from './helpers/messages';
import { errorResponse } from './helpers/response';

// const debug = Debug(config.appName);
// const port = normalizePort(process.env.PORT || config.port);

process.on('uncaughtException', (err) => {
  console.log('uncaughtException',err);
  process.exit(0);
});

process.on('UnhandledPromiseRejectionWarning', (err) => {
  console.log('UnhandledPromiseRejectionWarning',err);
  process.exit(0);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', { p, reason: reason.stack });
});

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  return next(err);
};

const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    return res
      .status(500)
      .send(errorResponse(messages.UNKNOWN_TECH_ERROR));
  }

  return next(err);
};

const errorHandler = (err, req, res, next) => {
  return res
    .status(500)
    .send(errorResponse(messages.UNKNOWN_TECH_ERROR));
};

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

/*
// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
*/

app.listen(
  process.env.WIKI_SERVER_PORT,
  () => {
    // debug(`${process.env.APP_NAME} listening on port ${process.env.WIKI_SERVER_PORT}!`);
    console.log(`${process.env.APP_NAME} listening on port ${process.env.WIKI_SERVER_PORT}!`);
  },
);
