'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const baseUrl = require('../../../config').baseUrl;
const createServer = require('../../../server');
const config = require('../../../config');
const createLogger = require('../../../logger');
const logger = createLogger(config);

describe('test health.controller.js', () => {
  let server;
  before((done) => {
    createServer(config, logger)
      .then(app => {
        server = app;
        done();
      })
      .catch(err => console.error(err));
  });
  it(`should return success code and healthy status when calling /health`, (done) => {
    chai.request(server)
      .get('/health')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.contain('healthy');
        done();
      });
  });
  it(`should return success code and healthy status when calling ${baseUrl}/health`, (done) => {
    chai.request(server)
      .get(`${baseUrl}/health`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.contain('healthy');
        done();
      });
  });
});
