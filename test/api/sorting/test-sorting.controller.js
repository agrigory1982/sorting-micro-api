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
const { BUBBLE, MERGE } = require('../../../consts');

describe('test sorting.controller.js', () => {
  let server;
  before((done) => {
    createServer(config, logger)
      .then(app => {
        server = app;
        done();
      })
      .catch(err => console.error(err));
  });
  it(`should return 401 error code when calling /POST bubbleSort without auth header`, (done) => {
    chai.request(server)
      .post(`${baseUrl}/bubbleSort`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.text).to.contain('Missing required');
        done();
      });
  });
  it(`should return 401 error code when calling /POST mergeSort without auth header`, (done) => {
    chai.request(server)
      .post(`${baseUrl}/mergeSort`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.text).to.contain('Missing required');
        done();
      });
  });
  it(`should return 404 error code when calling /POST bubbleSort without whitelisted auth header`, (done) => {
    chai.request(server)
      .post(`${baseUrl}/bubbleSort`)
      .set('x-api-key', 'some_fake_value')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.text).to.contain('Calling application is not authorized');
        done();
      });
  });
  it(`should return 404 error code when calling /POST mergeSort without whitelisted auth header`, (done) => {
    chai.request(server)
      .post(`${baseUrl}/mergeSort`)
      .set('x-api-key', 'some_fake_value')
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.text).to.contain('Calling application is not authorized');
        done();
      });
  });
  it(`should return 200 success code when calling /POST bubbleSort with valid data`, (done) => {
    let array = require('../../data/samples/data').set_1;
    chai.request(server)
      .post(`${baseUrl}/bubbleSort`)
      .set('x-api-key', config.whiteListedAppCodes.split(',')[0])
      .send({unsortedNumbers: array})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.to.have.keys(['type', 'result', 'size']);
        expect(res.body.type).to.equal(BUBBLE);
        done();
      });
  });
  it(`should return 200 success code when calling /POST mergeSort with valid data`, (done) => {
    let array = require('../../data/samples/data').set_1;
    chai.request(server)
      .post(`${baseUrl}/mergeSort`)
      .set('x-api-key', config.whiteListedAppCodes.split(',')[0])
      .send({unsortedNumbers: array})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.to.have.keys(['type', 'result', 'size']);
        expect(res.body.type).to.equal(MERGE);
        done();
      });
  });
  it(`should return 401 error code when calling /POST bubbleSort with invalid data - missing required property`, (done) => {
    let array = require('../../data/samples/data').set_1;
    chai.request(server)
      .post(`${baseUrl}/bubbleSort`)
      .set('x-api-key', config.whiteListedAppCodes.split(',')[0])
      .send({unsortedNumbers_fake: array})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.to.have.keys(['message']);
        expect(res.text).to.contain('Missing required \\"unsortedNumbers\\" property');
        done();
      });
  });
  it(`should return 401 error code when calling /POST mergeSort with invalid data - missing required property`, (done) => {
    let array = require('../../data/samples/data').set_1;
    chai.request(server)
      .post(`${baseUrl}/mergeSort`)
      .set('x-api-key', config.whiteListedAppCodes.split(',')[0])
      .send({unsortedNumbers_fake: array})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.to.have.keys(['message']);
        expect(res.text).to.contain('Missing required \\"unsortedNumbers\\" property');
        done();
      });
  });
  it(`should return 401 error code when calling /POST bubbleSort with invalid data - wrong type provided`, (done) => {
    let array = {'foo': 'bar'};
    chai.request(server)
      .post(`${baseUrl}/bubbleSort`)
      .set('x-api-key', config.whiteListedAppCodes.split(',')[0])
      .send({unsortedNumbers: array})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.to.have.keys(['message']);
        expect(res.text).to.contain('\\"unsortedNumbers\\" property must be an array!');
        done();
      });
  });
  it(`should return 401 error code when calling /POST mergeSort with invalid data - wrong type provided`, (done) => {
    let array = {'foo': 'bar'};
    chai.request(server)
      .post(`${baseUrl}/mergeSort`)
      .set('x-api-key', config.whiteListedAppCodes.split(',')[0])
      .send({unsortedNumbers: array})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.to.have.keys(['message']);
        expect(res.text).to.contain('\\"unsortedNumbers\\" property must be an array!');
        done();
      });
  });
});
