'use strict';

const config = require('../config');
if(!config.hasOwnProperty('whiteListedAppCodes')) throw new Error('No "whiteListedAppCodes" property defined in Configuration!');

/**
 *
 * @param req - request
 * @param res - response
 * @param next - callback
 * @returns {*}
 */
exports.checkAppCode = (req, res, next) => {
  let headers = req.headers;

  // Check if required header is present
  if(!headers.hasOwnProperty('x-api-key')) {
    return res.status(401).send({message: 'Missing required "x-api-key" header in the request!'});
  }

  // Check if header is white listed
  if(!config.whiteListedAppCodes.split(',').includes(headers['x-api-key'])) {
    return res.status(403).send({message: 'Calling application is not authorized'});
  }

  // Proceed to next middleware/controller
  return next();
};
