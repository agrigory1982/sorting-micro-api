'use strict';

const express = require('express');
const bunyanExpress = require('express-bunyan-logger');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

/**
 * Create Server
 *
 * @param config
 * @param logger
 * @returns {Promise<any>}
 */
function createServer(config, logger) {
  return new Promise((resolve, reject) => {
    const app = express();

    // Add security headers
    app.use(helmet());

    // Setup Logger
    app.use(bunyanExpress(logger));
    app.use(bunyanExpress.errorLogger(logger));

    // Setup BodyParser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Setup router
    require('../routes')(app);

    // Swagger setup for non-prod
    if (process.env.NODE_ENV !== 'production') {
      try {
        const swaggerDocument = YAML.load(__dirname + '/../api/swagger/' + config.swagger);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      } catch (err) {
        reject(err);
      }
    }

    resolve(app);
  });
}

module.exports = createServer;