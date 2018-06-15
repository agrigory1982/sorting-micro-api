'use strict';

const Sorter = require('../lib/Sorter');
const { BUBBLE, MERGE } = require('../consts');

/**
 * Perform sort by type
 *
 * @param {array} unsortedNumbers
 * @param {string} type
 * @returns {array}
 */
exports.sortByAlgorithm = (unsortedNumbers, type = BUBBLE) => {
  if (type !== BUBBLE && type !== MERGE) throw new Error(`Type must be either "${BUBBLE}" or "${MERGE}". Provided value is: "${type}"`);

  let sorter = new Sorter(unsortedNumbers);

  // If bubble - perform bubble sort
  if (type === BUBBLE) return sorter.bubbleSort();

  // If merge - perform merge sort
  if (type === MERGE) return sorter.mergeSort();
};
