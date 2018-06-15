/**
 * Main application routes
 */

'use strict';

const baseUrl = require('../config').baseUrl;

module.exports = function(app) {

  // Health Check
  app.use('/health', require('../api/health'));
  app.use(`${baseUrl}/health`, require('../api/health'));

  // Process incoming sorting
  app.use(`${baseUrl}/`, require('../api/sorting'));
};
