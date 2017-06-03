'use strict';
/*!
 * Constants.js
 *
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2017 ArcezD
 */
//Dependencies
const util = require('util');
const c = require('./constants');

module.exports = {
    requiredGames: {
        code: 1001,
        developerMessage: 'Must specify the number of games to be generated',
        userMessage: 'Must specify the number of games to be generated'
    },
    repeatedFavs: {
        code: 1002,
        developerMessage: 'The specified favorites can not be repeated',
        userMessage: 'The specified favorites can not be repeated'
    },
    favNotIntegers: {
        code: 1003,
        developerMessage: util.format('Favorites must be integers between %s and %s', c.minNum, c.maxNum),
        userMessage: util.format('Favorites must be integers between %s and %s', c.minNum, c.maxNum)
    },
    favsOutOfRange: {
        code: 1004,
        developerMessage: util.format('Must specify favorites between %s and %s', c.minNum, c.maxNum),
        userMessage: util.format('Must specify favorites between %s and %s', c.minNum, c.maxNum)
    },
    maxFavs: {
        code: 1005,
        developerMessage: 'Must especify a maximun of four integers',
        userMessage: 'Must especify a maximun of four integers'
    },
}