'use strict';
/*!
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2016 ArcezD
 */

const LambdaTester = require('lambda-tester');
const expect = require('chai').expect;
const index = require('../../index');
const util = require('util');
const err = require('../../errors');
const cg = require('../../constants');
const c = require('../constants');

describe('[ General Module | LottoApiTests ]', function () {
    it('Success POST || UnsupportedMediaType', function () {
        this.timeout(c.testTimeOut);
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'games=5&favorites=%5B10%2C20%5D'
            })
            .expectSucceed(function (result) {
                expect(result.statusCode).to.equal(415)
            });
    });
    it('Success POST || JSON', function () {
        this.timeout(c.testTimeOut);
        var cantGames = 2;
        var bodyReq = util.format('{"games":%s,"favorites":[1,30]}', cantGames)
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyReq
            })
            .expectSucceed(function (result) {
                var body = JSON.parse(result.body);
                expect(result.statusCode).to.equal(200)
                expect(body).to.have.lengthOf(cantGames);
            });
    });
    it('Success POST || JSON without favorites', function () {
        this.timeout(c.testTimeOut);
        var cantGames = 5;
        var bodyReq = util.format('{"games":%s}', cantGames);
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyReq
            })
            .expectSucceed(function (result) {
                var body = JSON.parse(result.body);
                expect(result.statusCode).to.equal(200)
                expect(body).to.have.lengthOf(cantGames);
            });
    });
    it('Error HTTP 400 || Null games', function () {
        this.timeout(c.testTimeOut);
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"favorites":[37]}'
            })
            .expectSucceed(function (result) {
                var body = JSON.parse(result.body);
                expect(result.statusCode).to.equal(400)
                expect(body.error.code).to.equal(err.requiredGames.code);
            });
    });
    it('Error HTTP 400 || Max favorite integer', function () {
        this.timeout(c.testTimeOut);
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"games": 1,"favorites":[37]}'
            })
            .expectSucceed(function (result) {
                var body = JSON.parse(result.body);
                expect(result.statusCode).to.equal(400)
                expect(body.error.code).to.equal(err.favsOutOfRange.code);
            });
    });
    it('Error HTTP 400 || Min favorite integer', function () {
        this.timeout(c.testTimeOut);
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"games": 1,"favorites":[-1]}'
            })
            .expectSucceed(function (result) {
                var body = JSON.parse(result.body);
                expect(result.statusCode).to.equal(400)
                expect(body.error.code).to.equal(err.favsOutOfRange.code);
            });
    });
    it('Error HTTP 400 || Non integer favorite', function () {
        this.timeout(c.testTimeOut);
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"games": 1,"favorites":["text"]}'
            })
            .expectSucceed(function (result) {
                var body = JSON.parse(result.body);
                expect(result.statusCode).to.equal(400)
                expect(body.error.code).to.equal(err.favNotIntegers.code);
            });
    });
    it('Error HTTP 400 || 5 or more favorites', function () {
        this.timeout(c.testTimeOut);
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"games": 1,"favorites":[0, 2, 3, 4, 5]}'
            })
            .expectSucceed(function (result) {
                var body = JSON.parse(result.body);
                expect(result.statusCode).to.equal(400)
                expect(body.error.code).to.equal(err.maxFavs.code);
            });
    });
    it('Error HTTP 400 || Repeated favorites', function () {
        this.timeout(c.testTimeOut);
        return LambdaTester(index.lottoApi)
            .event({
                httpMethod: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"games": 1,"favorites":[33, 12, 33]}'
            })
            .expectSucceed(function (result) {
                var body = JSON.parse(result.body);
                expect(result.statusCode).to.equal(400)
                expect(body.error.code).to.equal(err.repeatedFavs.code);
            });
    });
});

