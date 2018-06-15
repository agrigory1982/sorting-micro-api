'use strict';

const bunyan = require('bunyan');

function createLogger({ logger }) {
  return bunyan.createLogger({
    serializers: {
      req: bunyan.stdSerializers.req,
      res: bunyan.stdSerializers.res,
      err: bunyan.stdSerializers.err
    },
    ...logger
  });
}

module.exports = createLogger;