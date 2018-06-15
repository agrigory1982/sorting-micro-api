'use strict';

function sendHealthStatusResponse(req, res) {
  res.status(200).send({status: 'healthy'});
}

module.exports = {
  sendHealthStatusResponse,
};