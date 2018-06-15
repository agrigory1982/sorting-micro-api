'use strict';

const APP_NAME = 'sorting-api';

module.exports = require('rc')(APP_NAME, {
  port: process.env.PORT || 8080,
  env: 'local',
  logger: {
    name: APP_NAME,
    level: 'info'
  },
  baseUrl: '/api/v2',
  swagger: 'swagger-local.yaml',
  whiteListedAppCodes: 'X-SORTING-CODE',
});