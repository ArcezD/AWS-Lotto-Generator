'use strict';
/*!
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2017 ArcezD
 */

const lottoApi = require('./lotto/controllers/api');

/**
 * Expose Lotto ApiController.
 */
exports.lottoApi = lottoApi.apiHandler;