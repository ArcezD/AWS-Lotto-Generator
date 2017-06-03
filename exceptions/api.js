'use strict';
/*!
 * Author Diego Arce E.
 * @version 1.0
 * Copyright(c) 2017 ArcezD
 */

exports.methodNotAllowed = function () {
    var responseCode = 405;

    var responseBody = {
        error: {
            code: responseCode,
            message: "Method not allowed"
        }
    };

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    return response;
}

exports.unauthorized = function () {
    var responseCode = 401;

    var responseBody = {
        error: {
            code: responseCode,
            message: "Unauthorized"
        }
    };

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    return response;
}

exports.forbidden = function () {
    var responseCode = 403;

    var responseBody = {
        error: {
            code: responseCode,
            message: "Forbidden"
        }
    };

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    return response;
}

exports.unsupportedMediaType = function () {
    var responseCode = 415;

    var responseBody = {
        error: {
            status: responseCode,
            code: responseCode,
            message: "Unsupported Media Type"
        }
    };

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    return response;
}

exports.badRequest = function (err) {
    var responseCode = 400;

    var responseBody = {
        status: responseCode,
        error: err
    };

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    return response;
}

exports.internalServerError = function (textMessage) {
    var responseCode = 500;

    var responseBody = {
        error: {
            code: responseCode,
            message: textMessage
        }
    };

    var response = {
        statusCode: responseCode,
        body: JSON.stringify(responseBody)
    };

    return response;
}
