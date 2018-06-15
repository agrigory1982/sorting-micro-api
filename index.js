'use strict';

const config = require('./config');
const createLogger = require('./logger');
const logger = createLogger(config);
const createServer = require('./server');

const updateUncaughtLogger = require('./util/uncaught-exception-handler.util')();
updateUncaughtLogger(logger);

createServer(config, logger)
  .then(server => {
    server.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`);
    });
  })
  .catch(err => {
    logger.error({ err: err }, `Failed to start ${config.logger.name}`);
  });