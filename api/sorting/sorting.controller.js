'use strict';

const sortingService = require('../../services/sorting.service');
const { BUBBLE, MERGE } = require('../../consts');

/**
 * Performs sorting by type, "BUBBLE" sort and "MERGE" sort are supported
 *
 * @param {string} type - sorting by type: "BUBBLE" or "MERGE"
 * @returns {*}
 */
exports.sortByAlgorithm = (type) => {
  return (req, res) => {
    const { unsortedNumbers } = req.body;

    // Check if required property is present
    if (!unsortedNumbers) return res.status(401).send({message: 'Missing required "unsortedNumbers" property in the request body!'});

    // Check if required property is of valid type
    if (!Array.isArray(unsortedNumbers)) return res.status(401).send({message: '"unsortedNumbers" property must be an array!'});

    if (type !== BUBBLE && type !== MERGE) return res.status(401).send({message: `Type must be either "${BUBBLE}" or "${MERGE}". Provided value is: "${type}"`});

    try {
      let result = sortingService.sortByAlgorithm(unsortedNumbers, type);
      res.status(200).send({
        type: type,
        result,
        size: result.length
      });
      req.log.info(`Sorting done! Algorithm: ${type}. Array size: ${result.length}`);
    } catch (err) {
      req.log.error({ err: err }, 'Something went wrong!');
      res.status(500).send(err.message || 'Something went wrong!');
    }
  }
};
