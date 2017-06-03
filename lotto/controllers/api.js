'use strict';
/*!
 * Api [Lotto Module]
 * [AWS Lambda - Api Gateway]
 *
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2017 ArcezD
 */
const apiExceptions = require('../../exceptions/api');
const indicative = require('indicative')
const generator = require('../services/generator');
const Promise = require('bluebird');
const util = require('util');
const err = require('../../errors')
const qs = require('qs')
const c = require('../../constants');

function respGames(lottoGames) {
    var responseCode = 200;

    var responseBody = lottoGames;

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    return response
}

function validateInput(lotto) {
    return new Promise(function (resolve, reject) {
        /* Lotto games input validations */
        const rules = {
            'games': 'required|integer',
            'favorites': 'array',
            'favorites.*': util.format('integer|range:%s,%s', c.minNum - 1, c.maxNum + 1)
        }
        const data = {
            games: lotto.games,
            favorites: lotto.favorites
        }
        //var min = c.minNum
        const messages = {
            'games.required': err.requiredGames,
            'favorites.*.integer': err.favNotIntegers,
            'favorites.*.range': err.favsOutOfRange,
        }

        indicative
            .validate(data, rules, messages)
            .then(function (success) {
                resolve(success);
            })
            .catch(function (err) {
                // validation failed
                console.log('Error indicative.validate:', err);
                reject(apiExceptions.badRequest(err[0].message));
            });

    });
}

function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
}

function validateFavs(favArray, cb) {

    //Check for repetead values
    if (checkIfArrayIsUnique(favArray) == false) {
        cb(apiExceptions.badRequest(err.repeatedFavs));
        return;
    }

    if (favArray.length > 4) {
        cb(apiExceptions.badRequest(err.maxFavs));
        return;
    }

    cb(null, favArray);
}

function postAction(event, context) {
    return new Promise(function (resolve, reject) {

        var games;
        var favorites = [];
        var lottoGames;
        
        switch (event.headers['Content-Type']) {
            case 'application/json':

                if (indicative.is.json(JSON.stringify(event.body)) == false) {
                    resolve(apiExceptions.badRequest('Invalid json in payload.'));
                } else {
                    console.log('event.body',event.body);
                    lottoGames = JSON.parse(event.body);
                }

                break;
            default:
                resolve(apiExceptions.unsupportedMediaType());
        }

        validateInput(lottoGames)
            .then(function (lotto) {
                if (lotto.favorites != null) {
                    validateFavs(lotto.favorites, function (err, array) {
                        if (err) {
                            resolve(err);
                        } else {
                            generator.generateLotto(lotto.games, lotto.favorites)
                                .then(function (games) {
                                    resolve(respGames(games));
                                }).catch(function (errResponse) {
                                    resolve(errResponse);
                                });
                        }
                    });
                } else {
                    lotto.favorites = [];
                    generator.generateLotto(lotto.games, lotto.favorites)
                        .then(function (games) {
                            resolve(respGames(games));
                        }).catch(function (errResponse) {
                            resolve(errResponse);
                        });
                }
            }).catch(function (errResponse) {
                resolve(errResponse);
            });
    });
}

exports.apiHandler = function (event, context) {
    switch (event.httpMethod) {
        case 'POST':
            postAction(event, context)
                .then(function (response) {
                    context.succeed(response);
                }).catch(function (err) {
                    console.error(err);
                    context.fail(err);
                });
            break;
        default:
            context.succeed(apiExceptions.methodNotAllowed());
    }
};