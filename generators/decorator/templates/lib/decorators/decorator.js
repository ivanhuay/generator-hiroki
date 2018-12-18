'use strict';

function decorator(controller) {
    controller.request('get', function(req, res, next) {
        next();
    });
}

module.exports = decorator;
