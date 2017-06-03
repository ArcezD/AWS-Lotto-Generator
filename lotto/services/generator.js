'use strict';
/*!
 * Generator Services [Lotto Module]
 *
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2017 ArcezD
 */

/* Module dependencies */
const c = require('../../constants');
var Promise = require('bluebird');

/**
 * Generate random Int from given interval
 * @param {Number} min The minimun number to be generated
 * @param {Number} max The maximun number to be generated
 * @returns {Number} The random number
 */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateGame(favorites) {
    var numbers = favorites.slice(0);
    var cant = c.numbersLotto - favorites.length;

    for (var i = 0; i < cant; i++) {
        var random = randomIntFromInterval(c.minNum, c.maxNum);
        while (numbers.includes(random)) {
            random = randomIntFromInterval(c.minNum, c.maxNum);
        }
        numbers.push(random);
    }

    numbers=numbers.sort((a,b)=>a-b);

    return numbers
}

/**
 * Generate Lotto games
 * @param {Number} games The number of games to generate
 * @param {Array} favorites Array of numbers to be included
 * @returns {Promise} The generated games
 *
 */
exports.generateLotto = function (games, favorites) {
    return new Promise(function (resolve, reject) {
        var gamesArray = [];

        for (var x = 0; x < games; x++) {
            gamesArray[x] = generateGame(favorites)
        }

        resolve(gamesArray);
    });
}