'use strict';

const express = require('express');

const controller = require('./sorting.controller');
const authService = require('../../services/auth.service');
const { BUBBLE, MERGE } = require('../../consts');

const router = express.Router();

router.post('/bubbleSort', authService.checkAppCode, controller.sortByAlgorithm(BUBBLE));
router.post('/mergeSort', authService.checkAppCode, controller.sortByAlgorithm(MERGE));

module.exports = router;