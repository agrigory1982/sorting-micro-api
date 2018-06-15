'use strict';

function registerUncaughtHandler(logger = console) {
  function handler(type, err) {
    logger.error(err, type);
    process.exit(1);
  }

  process.on('uncaughtException', handler.bind(null, 'uncaughtException'));
  process.on('unhandledRejection', handler.bind(null, 'unhandledRejection'));

  return function updateLogger(newLogger) {
    logger = newLogger;
  };
}

module.exports = registerUncaughtHandler;