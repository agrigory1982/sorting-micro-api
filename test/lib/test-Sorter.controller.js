'use strict';

const chai = require('chai');
const expect = chai.expect;

const Sorter = require('../../lib/Sorter');

describe('test Sorter.js', () => {
  it(`should sort input data properly with bubble algorithm`, () => {
    let unsortedNumbers = require('../data/samples/data').set_1;
    let initialLength = unsortedNumbers.length;
    let sorter = new Sorter(unsortedNumbers);
    let result = sorter.bubbleSort();
    expect(result.length).to.equal(initialLength);
    [ -324, -67, -67, -54, -23, 0, 3, 12, 23, 26, 54, 56, 89, 324 ].forEach((el, i) => {
      expect(result[i]).to.be.equal(el);
    });
  });
  it(`should sort input data properly with merge algorithm`, () => {
    let unsortedNumbers = require('../data/samples/data').set_1;
    let initialLength = unsortedNumbers.length;
    let sorter = new Sorter(unsortedNumbers);
    let result = sorter.mergeSort();
    expect(result.length).to.equal(initialLength);
    [ -324, -67, -67, -54, -23, 0, 3, 12, 23, 26, 54, 56, 89, 324 ].forEach((el, i) => {
      expect(result[i]).to.be.equal(el);
    });
  });
});
